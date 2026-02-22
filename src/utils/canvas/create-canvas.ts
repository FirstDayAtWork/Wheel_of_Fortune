import type { WheelData } from "../wheel-data";
import { generateColors } from "./generate-colors";
import type { CanvasData, CanvasWheel, WheelOptions } from "./types";

export function createCanvas(canvas: HTMLCanvasElement, lsData: WheelData): CanvasData[] | null {
  const width = 512;
  const height = 512;

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  const colors = generateColors(lsData.list.length);
  const wheelOptions: WheelOptions = {};

  if (context) {
    const options: CanvasWheel = {
      context: context,
      width: width,
      height: height,
      lsData: lsData,
    };

    return [options, colors, wheelOptions] as CanvasData[];
  }

  return null;
}
