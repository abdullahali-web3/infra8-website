"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/*
 * "How it works" illustrations: flat, minimal product-UI mockups.
 *
 * One white window with a 1px hairline sits on the light panel and is cropped by it, the way
 * Figma's own sample is. No gradients, no filters, no shadows. Ink text, a single brand-blue
 * accent, and orange/green only as tiny status colours. Every colour is a theme token, applied
 * through Tailwind fill/stroke utilities, so the whole set restyles from globals.css.
 * The panel is decorative (aria-hidden); the step title and copy carry the meaning.
 */

const VB = "0 0 260 190";
const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ------------------------------- primitives -------------------------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <motion.svg
      viewBox={VB}
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full font-sans"
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.svg>
  );
}

/** The white window. It runs past the right and bottom edge so the panel crops it. */
function Win({ children }: { children: ReactNode }) {
  return (
    <motion.g variants={rise}>
      <rect x="20" y="20" width="250" height="190" rx="8" className="fill-white stroke-line" />
      {children}
    </motion.g>
  );
}

const TONE = {
  ink: "fill-ink",
  mute: "fill-ink/55",
  faint: "fill-ink/35",
  brand: "fill-brand",
  ok: "fill-ok",
  warn: "fill-warn",
  white: "fill-white",
  soft: "fill-white/60",
} as const;

function T({
  x,
  y,
  children,
  size = 7,
  tone = "ink",
  weight = 400,
  mono = false,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  tone?: keyof typeof TONE;
  weight?: 400 | 500 | 600;
  mono?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      letterSpacing={mono ? 0 : -0.1}
      className={`${TONE[tone]} ${mono ? "font-mono" : ""}`}
    >
      {children}
    </text>
  );
}

/** Window title: brand square + name. */
function Title({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="32" y="31" width="9" height="9" rx="2.5" className="fill-brand" />
      <T x={46} y={38.4} size={8.5} weight={600}>
        {children}
      </T>
      <line x1="20" x2="270" y1="50" y2="50" className="stroke-line" />
    </>
  );
}

const CHIP = {
  ok: { bg: "fill-ok/10", fg: "fill-ok" },
  warn: { bg: "fill-warn/10", fg: "fill-warn" },
  brand: { bg: "fill-brand/10", fg: "fill-brand" },
  mute: { bg: "fill-surface", fg: "fill-ink/60" },
} as const;

/** Status chip, same language as the chips on the service cards. */
function Chip({
  x,
  y,
  w,
  label,
  tone,
  dot = false,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  tone: keyof typeof CHIP;
  dot?: boolean;
}) {
  const c = CHIP[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height="14" rx="5" className={c.bg} />
      {dot ? <circle cx={x + 7} cy={y + 7} r="2" className={c.fg} /> : null}
      <text
        x={dot ? x + 13 : x + w / 2}
        y={y + 9.4}
        fontSize="6.5"
        fontWeight={500}
        textAnchor={dot ? "start" : "middle"}
        className={c.fg}
      >
        {label}
      </text>
    </g>
  );
}

/** Tool logo on a small hairline tile. Real brand marks, as everywhere else on the site. */
function Logo({ x, y, size = 22, name }: { x: number; y: number; size?: number; name: string }) {
  const pad = size * 0.2;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.24} className="fill-surface-2 stroke-line" />
      <image
        href={`/content/logos/${name}.svg`}
        x={x + pad}
        y={y + pad}
        width={size - pad * 2}
        height={size - pad * 2}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}

function Tick({ cx, cy, r = 6 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-ok" />
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.02} l${r * 0.3} ${r * 0.34} l${r * 0.56} ${-r * 0.62}`}
        className="fill-none stroke-white"
        strokeWidth={r * 0.24}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A bar that fills from the left as the panel scrolls into view. */
function Grow({
  x,
  y,
  w,
  h,
  className,
  delay = 0.2,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  className: string;
  delay?: number;
}) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      className={className}
      variants={{
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.9, delay, ease: EASE } },
      }}
      style={{ transformBox: "fill-box", transformOrigin: "left center" }}
    />
  );
}

/* ----------------------------- Product Development ----------------------------- */

function Estimate() {
  return (
    <Frame>
      <Win>
        <Title>New estimate</Title>
        <Chip x={176} y={29} w={68} label="Ready in 24 h" tone="ok" dot />

        <T x={32} y={68} size={6.5} tone="mute">
          Estimated range
        </T>
        <rect x="32" y="76" width="200" height="5" rx="2.5" className="fill-surface" />
        <Grow x={78} y={76} w={92} h={5} className="fill-brand" delay={0.3} />
        <circle cx="78" cy="78.5" r="5.5" className="fill-white stroke-brand" strokeWidth="1.6" />
        <circle cx="170" cy="78.5" r="5.5" className="fill-white stroke-brand" strokeWidth="1.6" />

        <T x={32} y={104} size={6.5} tone="mute">
          Timeline
        </T>
        {[80, 110, 140, 170, 200].map((x, i) => (
          <g key={x}>
            <line x1={x} x2={x} y1={112} y2={172} className="stroke-line" />
            <T x={x + 3} y={108} size={5} tone="faint" mono>{`W${i + 1}`}</T>
          </g>
        ))}
        <T x={32} y={124} size={6.5}>
          Design
        </T>
        <Grow x={80} y={118} w={54} h={7} className="fill-ink" delay={0.4} />
        <T x={32} y={142} size={6.5}>
          Build
        </T>
        <Grow x={104} y={136} w={96} h={7} className="fill-brand" delay={0.5} />
        <T x={32} y={160} size={6.5}>
          Launch
        </T>
        <Grow x={176} y={154} w={44} h={7} className="fill-ink/20" delay={0.6} />
      </Win>
    </Frame>
  );
}

function Discovery() {
  const docs = [
    { y: 64, t: "Scope", a: 82, b: 66 },
    { y: 94, t: "User flows", a: 78, b: 60 },
    { y: 124, t: "Architecture", a: 84, b: 52 },
  ];
  return (
    <Frame>
      <Win>
        <Title>Discovery sprint</Title>
        <Chip x={188} y={29} w={56} label="1–2 weeks" tone="mute" />

        {docs.map((d) => (
          <g key={d.t}>
            <rect x="32" y={d.y - 5} width="5" height="5" rx="1.5" className="fill-brand" />
            <T x={42} y={d.y} size={7.5} weight={600}>
              {d.t}
            </T>
            <rect x="32" y={d.y + 7} width={d.a} height="3.5" rx="1.75" className="fill-line" />
            <rect x="32" y={d.y + 15} width={d.b} height="3.5" rx="1.75" className="fill-line" />
          </g>
        ))}

        <line x1="128" x2="128" y1="50" y2="210" className="stroke-line" />

        <rect x="158" y="60" width="70" height="20" rx="5" className="fill-white stroke-brand" />
        <T x={193} y={73.2} size={7} weight={500} anchor="middle">
          Sign up
        </T>
        <path d="M193 80 V95 M190.6 92 L193 95.4 L195.4 92" className="fill-none stroke-ink/30" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="158" y="96" width="70" height="20" rx="5" className="fill-white stroke-line" />
        <T x={193} y={109.2} size={7} weight={500} anchor="middle">
          Onboarding
        </T>
        <path d="M193 116 V124 M193 124 H166 V133 M193 124 H220 V133" className="fill-none stroke-ink/30" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="140" y="134" width="52" height="20" rx="5" className="fill-white stroke-line" />
        <T x={166} y={147.2} size={7} weight={500} anchor="middle">
          Dashboard
        </T>
        <rect x="196" y="134" width="48" height="20" rx="5" className="fill-white stroke-line" />
        <T x={220} y={147.2} size={7} weight={500} anchor="middle">
          Billing
        </T>
      </Win>
    </Frame>
  );
}

function Demos() {
  return (
    <Frame>
      <Win>
        <line x1="66" x2="66" y1="20" y2="210" className="stroke-line" />
        <rect x="30" y="30" width="9" height="9" rx="2.5" className="fill-brand" />
        <rect x="26" y="50" width="34" height="11" rx="3" className="fill-surface" />
        <rect x="31" y="54" width="18" height="3" rx="1.5" className="fill-ink/60" />
        <rect x="31" y="70" width="22" height="3" rx="1.5" className="fill-line" />
        <rect x="31" y="84" width="18" height="3" rx="1.5" className="fill-line" />
        <rect x="31" y="98" width="24" height="3" rx="1.5" className="fill-line" />

        <T x={78} y={38.4} size={8.5} weight={600}>
          Dashboard
        </T>
        <Chip x={196} y={29} w={48} label="Week 3" tone="brand" dot />
        <line x1="66" x2="270" y1="50" y2="50" className="stroke-line" />

        {[
          { x: 78, l: "Active users", v: "1,284", d: "+12%" },
          { x: 162, l: "Signups", v: "342", d: "+8%" },
        ].map((s) => (
          <g key={s.l}>
            <rect x={s.x} y="58" width="78" height="36" rx="5" className="fill-white stroke-line" />
            <T x={s.x + 8} y={70} size={6} tone="mute">
              {s.l}
            </T>
            <T x={s.x + 8} y={86} size={11} weight={600}>
              {s.v}
            </T>
            <T x={s.x + 46} y={86} size={6.5} tone="ok" weight={500}>
              {s.d}
            </T>
          </g>
        ))}

        {[110, 124, 138].map((y) => (
          <line key={y} x1="78" x2="240" y1={y} y2={y} className="stroke-line" />
        ))}
        <polyline
          points="78,136 100,128 122,131 144,118 166,122 188,110 210,114 240,104"
          className="fill-none stroke-brand"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="240" cy="104" r="2.8" className="fill-white stroke-brand" strokeWidth="1.5" />

        {["W1", "W2", "W3", "W4"].map((w, i) => (
          <g key={w}>
            <rect
              x={78 + i * 44}
              y="150"
              width="40"
              height="14"
              rx="7"
              className={i < 3 ? "fill-brand" : "fill-white stroke-line"}
              strokeDasharray={i < 3 ? undefined : "2.5 2.5"}
            />
            <T x={98 + i * 44} y={159.4} size={6.5} weight={500} anchor="middle" tone={i < 3 ? "white" : "faint"}>
              {w}
            </T>
          </g>
        ))}
      </Win>
    </Frame>
  );
}

function Handover() {
  const rows = [
    { y: 60, l: "Source code", s: "Repository transferred", logo: "github" },
    { y: 92, l: "Documentation", s: "Docs and runbooks", logo: "" },
    { y: 124, l: "Cloud accounts", s: "Root access in your name", logo: "aws" },
  ];
  return (
    <Frame>
      <Win>
        <Title>Handover</Title>
        <Chip x={186} y={29} w={58} label="Complete" tone="ok" dot />
        {rows.map((r) => (
          <g key={r.l}>
            {r.logo ? (
              <Logo x={32} y={r.y} name={r.logo} />
            ) : (
              <g>
                <rect x="32" y={r.y} width="22" height="22" rx="5.3" className="fill-surface-2 stroke-line" />
                <rect x="38.5" y={r.y + 4.5} width="11" height="13" rx="1.6" className="fill-none stroke-ink/60" strokeWidth="1.1" />
                <path d={`M41 ${r.y + 9.5} h6 M41 ${r.y + 12.5} h6 M41 ${r.y + 15.5} h3.5`} className="fill-none stroke-ink/40" strokeWidth="1" strokeLinecap="round" />
              </g>
            )}
            <T x={62} y={r.y + 9.5} size={8} weight={500}>
              {r.l}
            </T>
            <T x={62} y={r.y + 19.5} size={6.5} tone="mute">
              {r.s}
            </T>
            <Tick cx={236} cy={r.y + 11} r={6} />
            <line x1="32" x2="246" y1={r.y + 28} y2={r.y + 28} className="stroke-line" />
          </g>
        ))}
      </Win>
    </Frame>
  );
}

/* -------------------------------- Cloud/DevOps -------------------------------- */

function Audit() {
  const rows = [
    { yc: 104, l: "Public storage buckets", c: "High", tone: "warn" as const },
    { yc: 126, l: "Unrotated access keys", c: "Medium", tone: "brand" as const },
    { yc: 148, l: "Idle compute", c: "Cost", tone: "brand" as const },
    { yc: 170, l: "Backups configured", c: "OK", tone: "ok" as const },
  ];
  return (
    <Frame>
      <Win>
        <Title>Infrastructure audit</Title>
        <Chip x={178} y={29} w={66} label="3 findings" tone="warn" dot />

        <Logo x={32} y={58} name="aws" />
        <Logo x={60} y={58} name="googlecloud" />
        <Logo x={88} y={58} name="azure" />
        <T x={122} y={72} size={6.5} tone="mute">
          3 accounts scanned
        </T>
        <line x1="20" x2="270" y1="90" y2="90" className="stroke-line" />

        {rows.map((r) => (
          <g key={r.l}>
            <circle cx="36" cy={r.yc} r="3" className={r.tone === "ok" ? "fill-ok" : r.tone === "warn" ? "fill-warn" : "fill-brand"} />
            <T x={46} y={r.yc + 2.6} size={7.5} weight={500}>
              {r.l}
            </T>
            <Chip x={198} y={r.yc - 7} w={46} label={r.c} tone={r.tone} />
            {r.yc < 170 ? <line x1="32" x2="246" y1={r.yc + 11} y2={r.yc + 11} className="stroke-line" /> : null}
          </g>
        ))}
      </Win>
    </Frame>
  );
}

function Findings() {
  const rows = [
    { yc: 76, s: "High", tone: "warn" as const, t: "Open storage bucket", e: 1 },
    { yc: 102, s: "Med", tone: "brand" as const, t: "Unpinned base image", e: 2 },
    { yc: 128, s: "Med", tone: "brand" as const, t: "No autoscaling", e: 2 },
    { yc: 154, s: "Low", tone: "mute" as const, t: "Verbose logging", e: 3 },
  ];
  return (
    <Frame>
      <Win>
        <Title>Findings report</Title>
        <T x={246} y={38.2} size={5.5} tone="faint" mono anchor="end">
          IMPACT · EFFORT
        </T>
        {rows.map((r) => (
          <g key={r.t}>
            <Chip x={32} y={r.yc - 7} w={34} label={r.s} tone={r.tone} />
            <T x={76} y={r.yc + 2.6} size={7.5} weight={500}>
              {r.t}
            </T>
            {[0, 1, 2].map((d) => (
              <circle key={d} cx={214 + d * 10} cy={r.yc} r="3" className={d < r.e ? "fill-ink" : "fill-line"} />
            ))}
            <line x1="32" x2="246" y1={r.yc + 13} y2={r.yc + 13} className="stroke-line" />
          </g>
        ))}
      </Win>
    </Frame>
  );
}

function Fix() {
  const stages = ["Plan", "Build", "Test", "Apply"];
  return (
    <Frame>
      <Win>
        <Title>Pipeline · main</Title>
        <Chip x={188} y={29} w={56} label="Passed" tone="ok" dot />

        {stages.map((s, i) => {
          const x = 32 + i * 58;
          return (
            <g key={s}>
              {i > 0 ? <line x1={x - 12} x2={x} y1="75" y2="75" className="stroke-line" /> : null}
              <rect x={x} y="62" width="46" height="26" rx="6" className="fill-white stroke-line" />
              <T x={x + 23} y={78} size={7} weight={500} anchor="middle">
                {s}
              </T>
              <Tick cx={x + 46} cy={62} r={4.2} />
            </g>
          );
        })}

        <rect x="32" y="104" width="212" height="76" rx="6" className="fill-ink" />
        <Logo x={186} y={110} size={16} name="terraform" />
        <Logo x={204} y={110} size={16} name="kubernetes" />
        <Logo x={222} y={110} size={16} name="githubactions" />
        <T x={42} y={124} size={6.5} tone="soft" mono>
          $ terraform plan
        </T>
        <T x={42} y={136} size={6.5} tone="soft" mono>
          Plan: 12 to add, 0 to destroy.
        </T>
        <T x={42} y={152} size={6.5} tone="white" mono>
          $ terraform apply
        </T>
        <T x={42} y={164} size={6.5} tone="ok" mono>
          Apply complete! 12 added.
        </T>
      </Win>
    </Frame>
  );
}

function Retainer() {
  const bars = Array.from({ length: 30 }, (_, i) => i);
  const cards = [
    { x: 32, l: "Uptime", v: "Stable", w: 44 },
    { x: 102, l: "Cost", v: "Lower", w: 36 },
    { x: 172, l: "Risk", v: "Low", w: 24 },
  ];
  return (
    <Frame>
      <Win>
        <Title>Monitoring</Title>
        <Chip x={128} y={29} w={116} label="All systems operational" tone="ok" dot />

        <T x={32} y={66} size={6.5} tone="mute">
          Uptime · last 30 days
        </T>
        {bars.map((i) => (
          <rect
            key={i}
            x={32 + i * 6.8}
            y="72"
            width="4.4"
            height="20"
            rx="1.5"
            className={i === 17 ? "fill-warn" : "fill-ok"}
          />
        ))}

        {cards.map((c) => (
          <g key={c.l}>
            <rect x={c.x} y="104" width="64" height="44" rx="5" className="fill-white stroke-line" />
            <T x={c.x + 8} y={116} size={6} tone="mute">
              {c.l}
            </T>
            <T x={c.x + 8} y={132} size={10} weight={600}>
              {c.v}
            </T>
            <rect x={c.x + 8} y="139" width="48" height="3" rx="1.5" className="fill-surface" />
            <Grow x={c.x + 8} y={139} w={c.w} h={3} className="fill-ok" delay={0.5} />
          </g>
        ))}

        <rect x="32" y="163" width="5" height="5" rx="1.5" className="fill-brand" />
        <T x={42} y={168.2} size={7.5} weight={500}>
          Monthly review
        </T>
        <Logo x={196} y={161} size={14} name="grafana" />
        <Logo x={214} y={161} size={14} name="datadog" />
        <Logo x={232} y={161} size={14} name="sentry" />
      </Win>
    </Frame>
  );
}

const ART = {
  product: [Estimate, Discovery, Demos, Handover],
  infra: [Audit, Findings, Fix, Retainer],
} as const;

export function StepArt({ track, index }: { track: keyof typeof ART; index: number }) {
  const C = ART[track][index];
  return <C />;
}
