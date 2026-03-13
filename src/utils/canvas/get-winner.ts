import type { WheelOptions } from "./types";

export function getWinner(wheelOptions: WheelOptions): string {
  const center = 270;

  for (const key in wheelOptions) {
    const { start, end, title } = wheelOptions[key];

    if (start <= end) {
      if (start <= center && center <= end) {
        return title;
      }
    } else {
      if (center >= start || center <= end) {
        return title;
      }
    }
  }

  return "No winner :(";
}
