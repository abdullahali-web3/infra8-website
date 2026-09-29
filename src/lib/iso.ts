/**
 * Isometric projection for the blueprint illustrations.
 * World axes: +x runs down-right, +y runs down-left, +z runs up. 1 world unit ≈ 1px at 1x.
 */
export const COS30 = Math.sqrt(3) / 2;

export type P3 = readonly [number, number, number];

const r = (n: number) => Math.round(n * 100) / 100;

export function iso(x: number, y: number, z = 0): [number, number] {
  return [r((x - y) * COS30), r((x + y) * 0.5 - z)];
}

export function points(list: readonly P3[]): string {
  return list.map(([x, y, z]) => iso(x, y, z).join(",")).join(" ");
}

/** The three visible faces of a box whose back-bottom corner is (x, y, z). */
export function boxFaces(x: number, y: number, z: number, w: number, d: number, h: number) {
  const t = z + h;
  return {
    top: points([
      [x, y, t],
      [x + w, y, t],
      [x + w, y + d, t],
      [x, y + d, t],
    ]),
    // Front-left face (the plane y = y + d).
    left: points([
      [x, y + d, t],
      [x + w, y + d, t],
      [x + w, y + d, z],
      [x, y + d, z],
    ]),
    // Front-right face (the plane x = x + w).
    right: points([
      [x + w, y, t],
      [x + w, y + d, t],
      [x + w, y + d, z],
      [x + w, y, z],
    ]),
  };
}

/** Maps a flat drawing (u → +x, v → +y) onto the horizontal plane at height z, origin (x, y). */
export function onTop(x: number, y: number, z: number): string {
  const [tx, ty] = iso(x, y, z);
  return `matrix(${r(COS30)} 0.5 ${r(-COS30)} 0.5 ${tx} ${ty})`;
}

/** Maps a flat drawing (u → +x, v → down) onto the front-left face plane through (x, y, z). */
export function onLeft(x: number, y: number, z: number): string {
  const [tx, ty] = iso(x, y, z);
  return `matrix(${r(COS30)} 0.5 0 1 ${tx} ${ty})`;
}

/** Maps a flat drawing (u → −y, i.e. screen right, v → down) onto the front-right face plane through (x, y, z). */
export function onRight(x: number, y: number, z: number): string {
  const [tx, ty] = iso(x, y, z);
  return `matrix(${r(COS30)} -0.5 0 1 ${tx} ${ty})`;
}
