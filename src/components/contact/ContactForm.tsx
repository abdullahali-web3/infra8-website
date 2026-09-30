"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { sendContact, type ContactField, type ContactState } from "@/app/contact/actions";
import { CONTACT_TIMELINES, CONTACT_TOPICS, isContactTopic, type ContactTopic } from "@/lib/contact";
import { ROUTES } from "@/lib/content";

const INITIAL: ContactState = { status: "idle" };

const INPUT =
  "h-12 w-full border bg-white px-4 text-[15px] tracking-[-0.01em] text-ink placeholder:text-muted/70 transition-colors focus:outline-none";
const OK_BORDER = "border-line hover:border-ink/40 focus:border-brand";
const BAD_BORDER = "border-warn focus:border-warn";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between font-mono text-[12px] leading-none text-ink-soft uppercase">
        {label}
        {optional ? <span className="text-muted normal-case">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm leading-5 text-warn">
          <CircleAlert aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Reads `?topic=` so every CTA can preselect the right option. Lives inside a Suspense boundary. */
export function ContactFormFromUrl() {
  const topic = useSearchParams().get("topic");
  return <ContactForm initialTopic={isContactTopic(topic) ? topic : "mvp"} />;
}

export function ContactForm({ initialTopic = "mvp" }: { initialTopic?: ContactTopic }) {
  const [state, action, pending] = useActionState(sendContact, INITIAL);
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const started = useRef<HTMLInputElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const current = CONTACT_TOPICS.find((t) => t.key === topic) ?? CONTACT_TOPICS[0];
  const e = state.errors ?? {};
  const v = state.values ?? {};

  // Timestamp for the bot check, set once when the page opens (in the DOM, so server and client
  // HTML match). React resets the form after each submit, which clears it, so a person correcting
  // an error and resubmitting quickly is never mistaken for a bot.
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);

  // Move focus to the error summary when a submission fails, so keyboard and screen reader users hear it.
  useEffect(() => {
    if (state.status === "error") errorSummary.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 border border-line bg-white p-8 lg:p-10">
        <CircleCheck aria-hidden className="size-10 text-ok" strokeWidth={1.5} />
        <h2 className="font-display text-[30px] leading-[1.15] tracking-[-0.03em] text-ink">
          Thanks{state.name ? `, ${state.name}` : ""}. Your message is in.
        </h2>
        <p className="max-w-[520px] text-base leading-7 tracking-[-0.02em] text-ink-soft">
          We reply within 24 hours on business days. If you asked for an MVP estimate, the reply includes a price range and a
          timeline.
        </p>
        <Link
          href={ROUTES.insights}
          className="inline-flex h-11 items-center border border-line px-4 font-mono text-[12px] leading-none text-ink uppercase transition-colors hover:border-ink"
        >
          Read our insights while you wait
        </Link>
      </div>
    );
  }

  const describedBy = (id: ContactField) => (e[id] ? `${id}-error` : undefined);

  return (
    <form action={action} noValidate className="flex flex-col gap-8 border border-line bg-white p-6 sm:p-8 lg:p-10">
      {state.status === "error" && state.message ? (
        <div
          ref={errorSummary}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 border border-warn/40 bg-warn/5 px-4 py-3 text-[15px] leading-6 text-ink focus:outline-none"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-warn" strokeWidth={1.75} />
          {state.message}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-mono text-[12px] leading-none text-ink-soft uppercase">What can we help with?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_TOPICS.map((t) => {
            const on = t.key === topic;
            return (
              <label
                key={t.key}
                className={`group/opt relative flex cursor-pointer flex-col gap-1 border px-4 py-3 transition-colors ${
                  on ? "border-brand bg-brand-tint/40" : "border-line hover:border-ink/40"
                } ${t.key === "careers" ? "sm:col-span-2" : ""}`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t.key}
                  checked={on}
                  onChange={() => setTopic(t.key)}
                  className="peer sr-only"
                />
                <span className="flex items-center gap-2 text-[15px] leading-5 tracking-[-0.02em] text-ink">
                  <span
                    aria-hidden
                    className={`grid size-4 place-items-center border transition-colors ${on ? "border-brand bg-brand" : "border-ink/30 bg-white"}`}
                  >
                    <span className={`size-1.5 bg-white ${on ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  {t.label}
                </span>
                <span className="pl-6 text-[13px] leading-5 text-muted">{t.hint}</span>
                <span aria-hidden className="pointer-events-none absolute inset-0 hidden outline-2 outline-offset-2 outline-brand peer-focus-visible:block" />
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={e.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={!!e.name}
            aria-describedby={describedBy("name")}
            className={`${INPUT} ${e.name ? BAD_BORDER : OK_BORDER}`}
          />
        </Field>
        <Field id="email" label="Work email" error={e.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={!!e.email}
            aria-describedby={describedBy("email")}
            className={`${INPUT} ${e.email ? BAD_BORDER : OK_BORDER}`}
          />
        </Field>
        <Field id="company" label="Company" optional error={e.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={v.company}
            aria-invalid={!!e.company}
            aria-describedby={describedBy("company")}
            className={`${INPUT} ${e.company ? BAD_BORDER : OK_BORDER}`}
          />
        </Field>
        <Field id="timeline" label="Timeline" optional error={e.timeline}>
          <select
            id="timeline"
            name="timeline"
            defaultValue={v.timeline ?? ""}
            aria-invalid={!!e.timeline}
            aria-describedby={describedBy("timeline")}
            className={`${INPUT} ${e.timeline ? BAD_BORDER : OK_BORDER} appearance-none bg-[url('/content/icons/chevron-down.svg')] bg-[length:9px_5px] bg-[position:right_16px_center] bg-no-repeat pr-10`}
          >
            <option value="">Choose one</option>
            {CONTACT_TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Your message" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={v.message}
          placeholder={current.prompt}
          aria-invalid={!!e.message}
          aria-describedby={describedBy("message")}
          className={`${INPUT} h-auto min-h-[160px] resize-y py-3 leading-6 ${e.message ? BAD_BORDER : OK_BORDER}`}
        />
      </Field>

      {/* Bot traps: a field people never see, and the time the form was opened. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={started} type="hidden" name="startedAt" defaultValue="" />

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[360px] text-[13px] leading-5 text-muted">
          We use your details only to reply. See our{" "}
          <Link href={ROUTES.privacy} className="text-ink-soft underline decoration-line underline-offset-4 hover:text-brand">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group/blk relative isolate inline-flex h-12 shrink-0 items-center justify-center gap-3 overflow-hidden bg-brand px-6 font-mono text-[12px] leading-none text-white uppercase transition-colors disabled:cursor-wait disabled:opacity-70"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 origin-right scale-x-0 bg-ink transition-[scale] duration-500 ease-out group-hover/blk:origin-left group-hover/blk:scale-x-100 group-disabled/blk:scale-x-0"
          />
          {pending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" strokeWidth={2} />
          ) : (
            <span aria-hidden className="size-1.5 bg-white" />
          )}
          {pending ? "Sending" : "Send message"}
        </button>
      </div>
    </form>
  );
}
