/** Shared gradients and filters for every illustration (rendered once in the layout). */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <defs>
        <linearGradient id="gCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f1f5fe" />
        </linearGradient>
        <linearGradient id="gBrand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b98ff" />
          <stop offset="1" stopColor="#0654fe" />
        </linearGradient>
        <linearGradient id="gBrandDeep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a4ce0" />
          <stop offset="1" stopColor="#03278c" />
        </linearGradient>
        <linearGradient id="gOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc47a" />
          <stop offset="1" stopColor="#ff8a1f" />
        </linearGradient>
        <linearGradient id="gInk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3348" />
          <stop offset="1" stopColor="#0b0f19" />
        </linearGradient>
        <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5be36f" />
          <stop offset="1" stopColor="#00b81c" />
        </linearGradient>
        <linearGradient id="gRibBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0f4cff" />
          <stop offset="1" stopColor="#6ea3ff" />
        </linearGradient>
        <linearGradient id="gRibOrange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff8410" />
          <stop offset="1" stopColor="#ffc47d" />
        </linearGradient>
        <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0654fe" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0654fe" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b98ff" />
          <stop offset="1" stopColor="#0654fe" />
        </linearGradient>
        <linearGradient id="gSweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0654fe" stopOpacity="0" />
          <stop offset="1" stopColor="#0654fe" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#dfe9ff" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="gGlassBrand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8db6ff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0654fe" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="gSideL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe6ff" />
          <stop offset="1" stopColor="#b9cffc" />
        </linearGradient>
        <linearGradient id="gSideR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9dafc" />
          <stop offset="1" stopColor="#a3bffa" />
        </linearGradient>
        <linearGradient id="gImg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfe0ff" />
          <stop offset="1" stopColor="#f4f8ff" />
        </linearGradient>
        <radialGradient id="gGlowBlue" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6da3ff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6da3ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gGlowOrange" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb45a" stopOpacity="0.65" />
          <stop offset="1" stopColor="#ffb45a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="gGlowWhite" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* Blueprint isometric fills: hatching that runs along each side face, and blue pixel dither. */}
        <pattern id="isoHatchL" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="4" height="4" fill="#ffffff" />
          <line x1="0" y1="0.5" x2="4" y2="0.5" stroke="#111111" strokeOpacity="0.5" strokeWidth="0.7" />
        </pattern>
        <pattern id="isoHatchR" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <rect width="6" height="6" fill="#ffffff" />
          <line x1="0" y1="0.5" x2="6" y2="0.5" stroke="#111111" strokeOpacity="0.28" strokeWidth="0.6" />
        </pattern>
        <pattern id="isoHatchMuted" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="4" height="4" fill="#ffffff" />
          <line x1="0" y1="0.5" x2="4" y2="0.5" stroke="#bdbdbd" strokeOpacity="0.8" strokeWidth="0.7" />
        </pattern>
        <pattern id="isoDither" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#ffffff" />
          <rect width="1.5" height="1.5" fill="#0654fe" />
        </pattern>
        <pattern id="isoDitherDense" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="#dbe6ff" />
          <rect width="1" height="1" fill="#0654fe" />
          <rect x="1" y="1" width="1" height="1" fill="#0654fe" />
        </pattern>
        <pattern id="isoFloor" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.7" fill="#b9b9b9" />
        </pattern>
        <filter id="fSoft" x="-30%" y="-30%" width="160%" height="175%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#12307a" floodOpacity="0.13" />
        </filter>
        <filter id="fLift" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#12307a" floodOpacity="0.2" />
        </filter>
        <filter id="fTiny" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#12307a" floodOpacity="0.14" />
        </filter>
      </defs>
    </svg>
  );
}
