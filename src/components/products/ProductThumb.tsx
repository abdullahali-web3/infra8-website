import type { CSSProperties, ReactNode } from "react";
import type { Product } from "@/lib/products";

/*
 * Product thumbnails: a flat browser-window mock of each product's main screen, drawn in SVG so it
 * stays sharp and costs no image requests. Each product's own colour comes in as `--p`.
 * All numbers and names inside are illustrative sample UI text.
 */

const P = "fill-[var(--p)]";
const P_STROKE = "stroke-[var(--p)]";

function T({ x, y, size = 9, className = "fill-ink", children, anchor }: { x: number; y: number; size?: number; className?: string; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} className={`font-sans ${className}`}>
      {children}
    </text>
  );
}

function Metrics({ name }: { name: string }) {
  const pts = [110, 150, 190, 230, 270, 310, 350, 390, 430, 452].map((x, i) => [x, [258, 250, 254, 236, 230, 214, 206, 188, 176, 168][i]]);
  const line = pts.map((p) => p.join(",")).join(" ");
  return (
    <>
      <rect x={0} y={30} width={84} height={270} className="fill-surface-2" />
      <line x1={84} y1={30} x2={84} y2={300} className="stroke-line" />
      <rect x={14} y={44} width={16} height={16} rx={4} className={P} />
      <T x={36} y={56} size={10}>{name}</T>
      {[84, 102, 120, 138].map((y, i) => (
        <rect key={y} x={14} y={y} width={i === 0 ? 56 : 46} height={6} rx={3} className={i === 0 ? P : "fill-line"} fillOpacity={i === 0 ? 0.35 : 1} />
      ))}
      <T x={100} y={52} size={12}>Revenue</T>
      <rect x={400} y={42} width={60} height={14} rx={7} className="fill-white stroke-line" />
      <T x={430} y={52} size={7} className="fill-muted" anchor="middle">Last 90 days</T>
      {[
        ["MRR", "$48.2k", "+12%"],
        ["Churn", "2.9%", "-0.4%"],
        ["Customers", "1,284", "+86"],
      ].map(([label, value, delta], i) => (
        <g key={label} transform={`translate(${100 + i * 122} 66)`}>
          <rect width={112} height={54} className="fill-white stroke-line" />
          <T x={10} y={16} size={7} className="fill-muted">{label}</T>
          <T x={10} y={38} size={16}>{value}</T>
          <T x={102} y={38} size={7} className={P} anchor="end">{delta}</T>
        </g>
      ))}
      <rect x={100} y={132} width={356} height={150} className="fill-white stroke-line" />
      {[170, 210, 250].map((y) => (
        <line key={y} x1={108} y1={y} x2={448} y2={y} className="stroke-line" strokeDasharray="2 3" />
      ))}
      <polygon points={`110,274 ${line} 452,274`} className={P} fillOpacity={0.1} />
      <polyline points={line} fill="none" className={P_STROKE} strokeWidth={1.8} strokeLinejoin="round" />
      <circle cx={452} cy={168} r={3.5} className={P} />
    </>
  );
}

function Alerts() {
  const rows = [
    ["s3://assets-prod", "Public read", 0],
    ["sg-0a13 · port 22", "Open to all", 0],
    ["iam/deploy-bot", "Admin policy", 1],
    ["gke/node-pool-2", "Outdated image", 1],
    ["logs-bucket", "Logging off", 2],
  ] as const;
  const dot = ["", "fill-accent", "fill-line"];
  return (
    <>
      <T x={18} y={52} size={12}>Findings</T>
      {["All 12", "High 2", "Medium 5"].map((c, i) => (
        <g key={c} transform={`translate(${18 + i * 58} 62)`}>
          <rect width={52} height={16} rx={8} className={i === 0 ? `${P}` : "fill-white stroke-line"} fillOpacity={i === 0 ? 0.14 : 1} />
          <T x={26} y={11} size={7} className={i === 0 ? P : "fill-muted"} anchor="middle">{c}</T>
        </g>
      ))}
      {rows.map(([name, issue, sev], i) => {
        const y = 88 + i * 40;
        return (
          <g key={name}>
            <line x1={18} y1={y + 36} x2={318} y2={y + 36} className="stroke-line" />
            <circle cx={26} cy={y + 14} r={4} className={sev === 0 ? P : dot[sev]} />
            <T x={38} y={y + 12} size={9}>{name}</T>
            <rect x={38} y={y + 20} width={90 - i * 8} height={4} rx={2} className="fill-line" />
            <rect x={238} y={y + 4} width={80} height={16} rx={8} className={sev === 0 ? P : "fill-surface-2"} fillOpacity={sev === 0 ? 0.12 : 1} />
            <T x={278} y={y + 15} size={7} className={sev === 0 ? P : "fill-muted"} anchor="middle">{issue}</T>
          </g>
        );
      })}
      <rect x={336} y={44} width={128} height={146} className="fill-white stroke-line" />
      <circle cx={400} cy={108} r={34} fill="none" className="stroke-line" strokeWidth={7} />
      <circle
        cx={400}
        cy={108}
        r={34}
        fill="none"
        className={P_STROKE}
        strokeWidth={7}
        strokeDasharray={`${2 * Math.PI * 34 * 0.92} ${2 * Math.PI * 34}`}
        transform="rotate(-90 400 108)"
        strokeLinecap="round"
      />
      <T x={400} y={114} size={18} anchor="middle">92</T>
      <T x={400} y={166} size={8} className="fill-muted" anchor="middle">Posture score</T>
      <rect x={336} y={202} width={128} height={70} className="fill-white stroke-line" />
      <T x={348} y={222} size={8} className="fill-muted">Accounts</T>
      <T x={348} y={244} size={14}>3 clouds</T>
      <rect x={348} y={254} width={70} height={4} rx={2} className={P} fillOpacity={0.35} />
    </>
  );
}

function Changelog() {
  const entries = [
    ["v2.4", "Faster exports", "#a3f9c2"],
    ["v2.3", "Slack alerts", "#71be04"],
    ["v2.2", "Team roles", "#0c55da"],
    ["v2.1", "Dark mode", "#e81f3b"],
  ];
  return (
    <>
      <T x={24} y={54} size={12}>Changelog</T>
      <line x1={36} y1={72} x2={36} y2={296} className="stroke-line" />
      {entries.map(([v, title, hash], i) => {
        const y = 82 + i * 58;
        return (
          <g key={v}>
            <circle cx={36} cy={y} r={5} className={i === 0 ? P : `fill-white ${P_STROKE}`} strokeWidth={1.5} />
            <rect x={52} y={y - 8} width={34} height={16} rx={8} className={P} fillOpacity={0.14} />
            <T x={69} y={y + 3} size={8} className={P} anchor="middle">{v}</T>
            <T x={94} y={y + 3} size={10}>{title}</T>
            <T x={300} y={y + 3} size={7} className="fill-muted font-mono" anchor="end">{hash}</T>
            <rect x={52} y={y + 16} width={236} height={4} rx={2} className="fill-line" />
            <rect x={52} y={y + 26} width={180 - i * 14} height={4} rx={2} className="fill-line" />
          </g>
        );
      })}
      <rect x={328} y={48} width={136} height={120} className="fill-white stroke-line" />
      <T x={340} y={70} size={10}>Get updates</T>
      <rect x={340} y={80} width={96} height={4} rx={2} className="fill-line" />
      <rect x={340} y={100} width={112} height={22} className="fill-white stroke-line" />
      <T x={348} y={114} size={7} className="fill-muted">you@company.com</T>
      <rect x={340} y={132} width={112} height={22} className={P} />
      <T x={396} y={146} size={8} className="fill-white" anchor="middle">Subscribe</T>
      <rect x={328} y={180} width={136} height={60} className="fill-white stroke-line" />
      <T x={340} y={200} size={8} className="fill-muted">From 38 pull requests</T>
      <rect x={340} y={212} width={60} height={14} rx={7} className={P} fillOpacity={0.14} />
      <T x={370} y={222} size={7} className={P} anchor="middle">Draft ready</T>
    </>
  );
}

function Proposal() {
  const items = [
    ["Discovery workshop", "1", "$2,400"],
    ["Website build", "1", "$9,800"],
    ["Support, 3 months", "3", "$1,200"],
  ];
  return (
    <>
      <rect x={0} y={30} width={480} height={270} className="fill-surface-2" />
      <rect x={104} y={42} width={272} height={258} className="fill-white stroke-line" />
      <rect x={120} y={58} width={14} height={14} rx={3} className={P} />
      <T x={140} y={69} size={10}>Proposal #1042</T>
      <T x={360} y={69} size={7} className="fill-muted" anchor="end">Valid for 14 days</T>
      <rect x={120} y={82} width={120} height={4} rx={2} className="fill-line" />
      {["Item", "Qty", "Price"].map((h, i) => (
        <T key={h} x={[120, 290, 360][i]} y={108} size={7} className="fill-muted" anchor={i === 2 ? "end" : "start"}>{h}</T>
      ))}
      <line x1={120} y1={114} x2={360} y2={114} className="stroke-line" />
      {items.map(([a, b, c], i) => (
        <g key={a}>
          <T x={120} y={132 + i * 20} size={8}>{a}</T>
          <T x={290} y={132 + i * 20} size={8} className="fill-muted">{b}</T>
          <T x={360} y={132 + i * 20} size={8} anchor="end">{c}</T>
        </g>
      ))}
      <rect x={120} y={190} width={240} height={28} className={P} fillOpacity={0.1} />
      <T x={130} y={208} size={9}>Total</T>
      <T x={350} y={208} size={11} className={P} anchor="end">$13,400</T>
      <line x1={120} y1={262} x2={220} y2={262} className="stroke-line" />
      <T x={120} y={274} size={7} className="fill-muted">Client signature</T>
      <rect x={272} y={248} width={88} height={24} className={P} />
      <T x={316} y={263} size={9} className="fill-white" anchor="middle">Accept</T>
      <g transform="translate(392 82)">
        <rect width={74} height={30} className="fill-white stroke-line" />
        <circle cx={14} cy={15} r={6} className={P} />
        <polyline points="11,15 13.5,17.5 17.5,12.5" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
        <T x={26} y={18} size={8}>Viewed</T>
      </g>
    </>
  );
}

function Form() {
  return (
    <>
      <rect x={0} y={30} width={480} height={270} className="fill-surface-2" />
      {[170, 240, 310].map((x, i) => (
        <g key={x}>
          {i < 2 ? <line x1={x + 10} y1={56} x2={x + 60} y2={56} className={i === 0 ? P_STROKE : "stroke-line"} strokeWidth={1.5} /> : null}
          <circle cx={x} cy={56} r={10} className={i < 2 ? P : "fill-white stroke-line"} />
          <T x={x} y={59} size={8} className={i < 2 ? "fill-white" : "fill-muted"} anchor="middle">{String(i + 1)}</T>
        </g>
      ))}
      <rect x={110} y={80} width={260} height={214} className="fill-white stroke-line" />
      <T x={126} y={104} size={12}>Tell us about your team</T>
      {[
        ["Company name", 120],
        ["Team size", 176],
      ].map(([label, y], i) => (
        <g key={label as string}>
          <T x={126} y={(y as number) + 2} size={7} className="fill-muted">{label}</T>
          <rect x={126} y={(y as number) + 8} width={228} height={24} className={i === 0 ? `fill-white ${P_STROKE}` : "fill-white stroke-line"} strokeWidth={i === 0 ? 1.5 : 1} />
          {i === 0 ? <T x={134} y={(y as number) + 24} size={8}>Acme Inc.</T> : null}
        </g>
      ))}
      <g transform="translate(126 158)">
        <rect width={132} height={14} rx={7} className={P} fillOpacity={0.12} />
        <path d="M9 3 L10.2 6 L13 7 L10.2 8 L9 11 L7.8 8 L5 7 L7.8 6 Z" className={P} />
        <T x={18} y={10} size={7} className={P}>Suggested from your domain</T>
      </g>
      <rect x={126} y={250} width={228} height={28} className={P} />
      <T x={240} y={268} size={9} className="fill-white" anchor="middle">Continue</T>
    </>
  );
}

/** A product's thumbnail: a browser window with its main screen. */
export function ProductThumb({ product, className = "h-full w-full" }: { product: Product; className?: string }) {
  const body = {
    metrics: <Metrics name={product.name} />,
    alerts: <Alerts />,
    changelog: <Changelog />,
    proposal: <Proposal />,
    form: <Form />,
  }[product.thumb];
  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
      style={{ "--p": product.accent } as CSSProperties}
    >
      <rect x={0} y={0} width={480} height={300} className="fill-white" />
      {body}
      <rect x={0} y={0} width={480} height={30} className="fill-surface-2" />
      <line x1={0} y1={30} x2={480} y2={30} className="stroke-line" />
      {[16, 28, 40].map((x) => (
        <circle key={x} cx={x} cy={15} r={3.5} className="fill-line" />
      ))}
      <rect x={160} y={8} width={160} height={14} rx={7} className="fill-white stroke-line" />
      <T x={240} y={18} size={7} className="fill-muted font-mono" anchor="middle">{product.domain}</T>
      <rect x={0.5} y={0.5} width={479} height={299} fill="none" className="stroke-line" />
    </svg>
  );
}
