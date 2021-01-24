import { Color } from './types';

export function RGBAToHexA(r: number, g: number, b: number, a: number): Color {
  let hex_r = r.toString(16);
  let hex_g = g.toString(16);
  let hex_b = b.toString(16);
  let hex_a = a.toString(16);

  if (hex_r.length === 1) hex_r = `0${hex_r}`;
  if (hex_g.length === 1) hex_g = `0${hex_g}`;
  if (hex_b.length === 1) hex_b = `0${hex_b}`;
  if (hex_a.length === 1) hex_a = `0${hex_a}`;

  return { r, g, b, a, hex: `#${hex_r}${hex_g}${hex_b}${hex_a}` };
}

export function hexAToRGBA(h: string): Color | undefined {
  let r = 0,
    g = 0,
    b = 0,
    a = 255,
    valid = false;

  if (h.length === 4) {
    r = +('0x' + h[1] + h[1]);
    g = +('0x' + h[2] + h[2]);
    b = +('0x' + h[3] + h[3]);
    valid = true;
  } else if (h.length === 5) {
    r = +('0x' + h[1] + h[1]);
    g = +('0x' + h[2] + h[2]);
    b = +('0x' + h[3] + h[3]);
    a = +('0x' + h[4] + h[4]);
    valid = true;
  } else if (h.length === 7) {
    r = +('0x' + h[1] + h[2]);
    g = +('0x' + h[3] + h[4]);
    b = +('0x' + h[5] + h[6]);
    valid = true;
  } else if (h.length === 9) {
    r = +('0x' + h[1] + h[2]);
    g = +('0x' + h[3] + h[4]);
    b = +('0x' + h[5] + h[6]);
    a = +('0x' + h[7] + h[8]);
    valid = true;
  }

  if (!valid) return undefined;

  a = +a;

  return { r, g, b, a, hex: h };
}

export const contrastingColor = (color?: Color) => {
  if (!color) {
    return '#fff';
  }

  if (color.a === 0) {
    return 'rgba(0,0,0,0.4)';
  }
  const intensity =
    (color.r ?? 0) * 299 + (color.g ?? 0) * 587 + (color.b ?? 0) * 114;
  return intensity >= 128000 ? '#000' : '#fff';
};
