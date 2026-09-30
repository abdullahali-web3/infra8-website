"use server";

import { CONTACT_TIMELINES, CONTACT_TOPICS, type ContactTopic } from "@/lib/contact";

export type ContactField = "topic" | "name" | "email" | "company" | "timeline" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<ContactField, string>>;
  name?: string;
};

type Lead = {
  topic: ContactTopic;
  name: string;
  email: string;
  company: string;
  timeline: string;
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

/**
 * Contact form handler. Validates on the server (never trust the client), drops obvious bots
 * (honeypot field, or submitted faster than a person could type), then delivers the lead.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Bots fill the hidden field or submit instantly. Answer as if it worked, so they learn nothing.
  const startedAt = Number(str(formData, "startedAt"));
  if (str(formData, "website") || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const values = {
    topic: str(formData, "topic"),
    name: str(formData, "name"),
    email: str(formData, "email"),
    company: str(formData, "company"),
    timeline: str(formData, "timeline"),
    message: str(formData, "message"),
  };

  const errors: ContactState["errors"] = {};
  if (!CONTACT_TOPICS.some((t) => t.key === values.topic)) errors.topic = "Choose what you'd like to talk about.";
  if (!values.name) errors.name = "Tell us your name.";
  else if (values.name.length > 100) errors.name = "Please keep your name under 100 characters.";
  if (!EMAIL.test(values.email) || values.email.length > 200) errors.email = "Enter a valid email address.";
  if (values.company.length > 120) errors.company = "Please keep this under 120 characters.";
  if (values.timeline && !CONTACT_TIMELINES.includes(values.timeline)) errors.timeline = "Choose a timeline from the list.";
  if (values.message.length < 10) errors.message = "Add a few words about what you need (at least 10 characters).";
  else if (values.message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const delivered = await deliver(values as Lead);
  if (!delivered) {
    return {
      status: "error",
      message: "We couldn't send your message just now. Please try again in a few minutes.",
      values,
    };
  }
  return { status: "success", name: values.name.split(" ")[0] };
}

function summary(lead: Lead) {
  const topic = CONTACT_TOPICS.find((t) => t.key === lead.topic)?.label ?? lead.topic;
  return [
    `New enquiry: ${topic}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || "-"}`,
    `Timeline: ${lead.timeline || "-"}`,
    "",
    lead.message,
  ].join("\n");
}

/**
 * Delivery is configured with environment variables (set them in Vercel):
 * - RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL): email via Resend.
 * - CONTACT_WEBHOOK_URL: JSON POST to Slack, Zapier, Make or a CRM (includes a Slack-style `text`).
 * With neither set, nothing is sent and the visitor is told it failed, so no lead is silently lost.
 */
async function deliver(lead: Lead): Promise<boolean> {
  const text = summary(lead);
  const tasks: Promise<boolean>[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Infra8 website <onboarding@resend.dev>",
          to: [to],
          reply_to: lead.email,
          subject: text.split("\n")[0],
          text,
        }),
      }).then((r) => r.ok),
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, ...lead, submittedAt: new Date().toISOString() }),
      }).then((r) => r.ok),
    );
  }

  if (!tasks.length) {
    console.warn("[contact] No delivery configured (RESEND_API_KEY + CONTACT_TO_EMAIL, or CONTACT_WEBHOOK_URL).");
    return false;
  }
  const results = await Promise.allSettled(tasks);
  // Delivered if at least one channel accepted it.
  return results.some((r) => r.status === "fulfilled" && r.value);
}
