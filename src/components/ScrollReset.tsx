"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Opens every new page at the very top. Next.js scrolls the new page's first element into view,
 * which with our sticky header leaves the page a little way down. Links to an anchor (#faq) keep
 * their own scroll target.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    // After Next.js has applied its own scroll for the navigation.
    const id = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
