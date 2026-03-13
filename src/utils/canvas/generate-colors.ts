interface WheelOptions {
  count: number;
  baseChroma?: number;
  maxLightness?: number;
}

export function generateOklchColors({
  count,
  baseChroma = 0.18,
  maxLightness = 55,
}: WheelOptions): string[] {
  const colors: string[] = [];
  const startHue = Math.floor(Math.random() * 360);
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = (startHue + i * hueStep) % 360;
    colors.push(`oklch(${maxLightness}% ${baseChroma} ${hue.toFixed(2)})`);
  }

  return colors;
}
