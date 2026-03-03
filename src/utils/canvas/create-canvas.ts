import type { WheelData } from "../wheel-data";
import { generateOklchColors } from "./generate-colors";
import type { CanvasData, CanvasWheel, WheelOptions } from "./types";

export function createCanvas(
  canvas: HTMLCanvasElement,
  lsData: WheelData,
  size: number,
): CanvasData | null {
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");

  const colors = generateOklchColors({ count: lsData.list.length });
  const wheelOptions: WheelOptions = {};

  if (context) {
    const options: CanvasWheel = {
      context: context,
      width: size,
      height: size,
      lsData: lsData,
      currentRotation: 0,
      trueCords: {},
      totalWeight: lsData.list.reduce((a, b) => a + b.weight, 0),
    };

    return [options, colors, wheelOptions];
  }

  return null;
}
