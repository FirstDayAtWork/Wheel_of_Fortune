import { drawArrow } from "./draw-arrow";
import { drawCircle } from "./draw-circle";
import { drawSegment } from "./draw-segment";
import { drawWheel } from "./draw-wheel";
import type { CanvasData } from "./types";

export function draw(canvasData: CanvasData, currentDegre = 0) {
  const [options, colors] = canvasData;
  const { context, width, height, lsData } = options;

  if (context) {
    const radius = height / 2 - 20;
    context.clearRect(0, 0, width, height);

    drawWheel(context, width, radius);

    const updatedOptions = drawSegment(
      context,
      radius,
      width,
      height,
      lsData,
      currentDegre,
      colors,
    );

    canvasData[2] = updatedOptions;

    drawCircle(context, width);

    drawArrow(context, width);
  }
}
