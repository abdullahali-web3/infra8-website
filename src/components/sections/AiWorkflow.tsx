"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { AI_POINTS, CTA } from "@/lib/content";
import { BlockButton } from "@/components/ui/BlockButton";
import { BpSection, SectionHead } from "@/components/ui/Blueprint";
import { Reveal } from "@/components/Reveal";

const TAB_MS = 6000;
const HOLD_FILL_MS = 450;

/** Illustrative snippets, one per AI point (same order as AI_POINTS). Sample code, not client output. */
const SNIPPETS: { file: string; lines: string[] }[] = [
  {
    file: ".github/workflows/review.yml",
    lines: [
      "on: pull_request",
      "",
      "jobs:",
      "  ai-review:",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - run: npm run review:ai   # machine first pass",
      "",
      "  senior-review:",
      "    needs: ai-review",
      "    # a senior engineer approves before merge",
      "    environment: human-approval",
    ],
  },
  {
    file: "checkout.test.ts",
    lines: [
      "// generated first, then read by an engineer",
      'describe("checkout", () => {',
      '  it("rejects an expired card", async () => {',
      "    const res = await pay({ card: expiredCard });",
      "    expect(res.status).toBe(402);",
      "  });",
      "",
      '  it("retries a timed-out payment once", async () => {',
      "    const res = await pay({ card, timeoutMs: 1 });",
      "    expect(res.attempts).toBe(2);",
      "  });",
      "});",
    ],
  },
  {
    file: "scan --cloud aws --account prod",
    lines: [
      "$ scan --cloud aws --account prod",
      "",
      "✕ s3://assets-prod      public read enabled",
      "! ec2 i-0a3f9c          idle for 21 days",
      "! rds db-staging        larger than its load",
      "! iam deploy-bot        unused admin policy",
      "✓ 42 checks passed",
      "",
      "→ report ranked by impact and effort",
    ],
  },
  {
    file: "estimate.json",
    lines: [
      "{",
      '  "project": "marketplace-mvp",',
      '  "screens": 14,',
      '  "integrations": ["stripe", "sendgrid"],',
      '  "discovery": "1–2 weeks",',
      '  "estimate": {',
      '    "range": "sent within 24 hours",',
      '    "exact": "after the scoping call"',
      "  }",
      "}",
    ],
  },
];

const TOKEN =
  /(\/\/.*$|#.*$)|("[^"]*")|\b(on|jobs|steps|uses|run|needs|environment|describe|it|const|await|async|expect)\b|(\b\d+\b)|(^\$|✕|✓|!|→)/g;

function Line({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const cls = m[1]
      ? "text-code-dim"
      : m[2]
        ? "text-code-str"
        : m[3]
          ? "text-code-key"
          : m[4]
            ? "text-code-str"
            : m[0] === "✕"
              ? "text-warn"
              : m[0] === "✓"
                ? "text-ok"
                : "text-code-key";
    out.push(
      <span key={i} className={cls}>
        {m[0]}
      </span>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.length ? out : " "}</>;
}

/** "AI-native workflow": a framed code window that types each snippet, beside auto-advancing tabs. */
export function AiWorkflow() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const snippet = SNIPPETS[active];

  function copy() {
    navigator.clipboard?.writeText(snippet.lines.join("\n")).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    });
  }

  return (
    <BpSection id="ai-workflow">
      <SectionHead
        eyebrow="AI-native workflow"
        title={"Faster Delivery. Senior\nEngineers Stay in Charge."}
        sub="We use AI where it saves time and keep humans where it matters. A senior engineer reviews everything before it ships."
      />
      <div ref={ref} className="mt-12 grid grid-cols-[minmax(0,1fr)] border-t border-line lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="dots relative flex flex-col justify-center border-line px-4 py-10 sm:px-8 lg:border-r lg:px-12 lg:py-14">
          <Reveal y={16}>
            <div className="overflow-hidden rounded-[4px] bg-code font-mono text-[12px] leading-[22px] text-code-text sm:text-[13px]">
              <div className="flex items-center justify-between gap-4 border-b border-code-line bg-code-bar px-4 py-2.5">
                <span className="truncate text-[11px] tracking-[0.02em] text-code-dim uppercase">{snippet.file}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex shrink-0 items-center gap-1.5 border border-code-line px-2 py-1 text-[11px] text-code-text uppercase transition-colors hover:border-code-dim"
                >
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
                    <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" />
                    <path d="M1.5 8.5v-7h7" stroke="currentColor" />
                  </svg>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="min-h-[330px] overflow-x-auto px-4 py-4" aria-label={`Sample: ${snippet.file}`}>
                <code key={active} className="block">
                  {snippet.lines.map((l, i) => (
                    <span key={i} className="flex">
                      <span aria-hidden className="w-8 shrink-0 text-right text-code-dim/60 select-none">
                        {i + 1}
                      </span>
                      <span className="bp-line ml-4 whitespace-pre" style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                        <Line text={l} />
                      </span>
                    </span>
                  ))}
                  <span aria-hidden className="bp-caret mt-1 ml-12 inline-block h-4 w-2 bg-code-key" />
                </code>
              </pre>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-8 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <ul className="flex flex-col border-l border-line" onMouseLeave={() => setHeld(false)}>
            {AI_POINTS.map((p, i) => {
              const on = i === active;
              return (
                <li
                  key={p.title}
                  className="relative"
                  onMouseEnter={() => {
                    setActive(i);
                    setHeld(true);
                  }}
                >
                  {on ? (
                    <span
                      // A hovered tab fills its rail quickly and holds; otherwise it runs on the timer.
                      key={`${active}-${held}`}
                      aria-hidden
                      className="bp-progress-y absolute top-0 -left-px h-full w-0.5 bg-brand"
                      style={{
                        ["--bp-dur" as string]: held ? `${HOLD_FILL_MS}ms` : `${TAB_MS}ms`,
                        animationTimingFunction: held ? "cubic-bezier(0.22, 1, 0.36, 1)" : "linear",
                        animationPlayState: held || inView ? "running" : "paused",
                      }}
                      onAnimationEnd={() => {
                        if (!held) setActive((n) => (n + 1) % AI_POINTS.length);
                      }}
                    />
                  ) : null}
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`ai-point-${i}`}
                      onClick={() => setActive(i)}
                      className={`w-full py-3 pl-5 text-left font-display text-[20px] leading-6 tracking-[-0.03em] transition-colors duration-300 ${on ? "text-brand" : "text-muted hover:text-ink"}`}
                    >
                      {p.title}
                    </button>
                  </h3>
                  <div
                    id={`ai-point-${i}`}
                    className={`grid pl-5 transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden text-sm leading-5 tracking-[-0.01em] text-ink-soft">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Reveal delay={0.2}>
            <BlockButton href={CTA.contact}>Talk to Our Engineers</BlockButton>
          </Reveal>
        </div>
      </div>
    </BpSection>
  );
}
