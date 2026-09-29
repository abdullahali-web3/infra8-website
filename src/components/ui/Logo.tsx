import Image from "next/image";
import { logoSrc } from "@/lib/logos";

export function Logo({
  name,
  size = 22,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const src = logoSrc(name);
  if (!src) return null;
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
