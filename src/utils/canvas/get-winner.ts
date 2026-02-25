import type { WheelOptions } from "./types";

const center = Math.PI * 1.5 * (180 / Math.PI);
const normalizedCenter = center % 360;

export function getWinner(wheelOptions: WheelOptions): string {
  for (const key in wheelOptions) {
    const segment = wheelOptions[key];

    if (!segment) continue;

    const { start, end, title } = segment;

    if (start <= end) {
      if (start <= normalizedCenter && normalizedCenter <= end) {
        return title;
      }
    } else {
      if (normalizedCenter >= start || normalizedCenter <= end) {
        return title;
      }
    }
  }

  return "No winner :(";
}
