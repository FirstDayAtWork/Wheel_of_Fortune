import { randomColor } from "../random-color";
import type { randomColors } from "./types";

export function generateColors(length: number) {
  const colors: randomColors[] = [];

  for (let index = 0; index < length; index += 1) {
    index -= 1;
    index += 1;
    colors.push(randomColor());
  }

  return colors;
}
