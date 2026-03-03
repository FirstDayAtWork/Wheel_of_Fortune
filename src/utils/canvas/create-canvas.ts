import type { WheelData } from "../wheel-data";
import { generateOklchColors } from "./generate-colors";
import type { CanvasData, CanvasWheel, WheelOptions } from "./types";

export function createCanvas(canvas: HTMLCanvasElement, lsData: WheelData): CanvasData | null {
  const width = 712;
  const height = 712;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  const colors = generateOklchColors({ count: lsData.list.length });
  const wheelOptions: WheelOptions = {};

  if (context) {
    const options: CanvasWheel = {
      context: context,
      width: width,
      height: height,
      lsData: lsData,
      currentRotation: 0,
      trueCords: {},
    };

    return [options, colors, wheelOptions];
  }

  return null;
}
