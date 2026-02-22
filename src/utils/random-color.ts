import { randomNumber } from "./random-number";

export function randomColor() {
  const red = randomNumber(255);
  const green = randomNumber(255);
  const blue = randomNumber(255);
  return { red, green, blue };
}
