import type { WheelData } from "../wheel-data";

export interface CanvasWheel {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  lsData: WheelData;
  currentDegre?: number;
  currentRotation: number;
  trueCords: WheelOptions;
  totalWeight: number;
}

export type randomColors = string;

export type WheelOptions = Record<
  string,
  {
    title: string;
    start: number;
    end: number;
  }
>;

export type CanvasData = [CanvasWheel, randomColors[], WheelOptions];
