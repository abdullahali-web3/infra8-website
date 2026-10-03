import { siteConfig } from "@/lib/site";

type Network = "facebook" | "x" | "linkedin" | "trustpilot";

/** Official brand marks (Simple Icons, 24x24), drawn in currentColor so they follow the theme. */
const NETWORKS: { key: Network; label: string; hover: string; path: string }[] = [
  {
    key: "facebook",
    hover: "hover:text-social-facebook",
    label: "Facebook",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    key: "x",
    hover: "hover:text-social-x",
    label: "X",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  },
  {
    key: "linkedin",
    hover: "hover:text-social-linkedin",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    key: "trustpilot",
    hover: "hover:text-social-trustpilot",
    label: "Trustpilot",
    path: "M17.227 16.67l2.19 6.742-7.413-5.388 5.223-1.354zM24 9.31h-9.165L12.005.589l-2.84 8.723L0 9.3l7.422 5.397-2.84 8.714 7.422-5.388 4.583-3.326L24 9.311z",
  },
];

// Grey marks at rest; each takes its own brand colour on hover.
const TILE = "grid size-10 place-items-center border border-line bg-white text-ink-soft transition-colors duration-200 hover:border-ink/20";

/**
 * Social profile links. A network without a URL in `siteConfig.socials` still shows its mark,
 * but not as a link, until the real profile URL is set.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="Infra8 on social media" className={`flex gap-2 ${className}`}>
      {NETWORKS.map((n) => {
        const href = siteConfig.socials[n.key];
        const icon = (
          <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
            <path d={n.path} />
          </svg>
        );
        return (
          <li key={n.key}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Infra8 on ${n.label}`}
                className={`${TILE} ${n.hover}`}
              >
                {icon}
              </a>
            ) : (
              <span className={`${TILE} ${n.hover}`}>
                {icon}
                <span className="sr-only">{n.label} profile coming soon</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
