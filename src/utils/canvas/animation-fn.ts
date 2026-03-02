export function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function easeOutBack(x: number): number {
  const c1 = 0.8;
  const c3 = c1 + 1;

  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
}

export function easeInOutBack(x: number): number {
  const c1 = 0.5;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? ((2 * x) ** 2 * ((c2 + 1) * 2 * x - c2)) / 2
    : ((2 * x - 2) ** 2 * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
