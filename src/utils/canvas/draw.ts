import { drawSegment } from "./draw-segment";
import type { CanvasData } from "./types";

export function draw(canvasData: CanvasData, currentDegre = 0) {
  const [options, colors] = canvasData;
  const { context, width, height, lsData } = options;

  if (context) {
    const radius = height / 2 - 20;
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.stroke();

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

    context.beginPath();
    context.arc(width / 2, height / 2, height / 12, 0, 2 * Math.PI);
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();
    context.fillStyle = "#1c1c1c";
    context.fill();

    context.beginPath();
    context.moveTo(width / 2, 35);
    context.lineTo(245, Math.PI * 1.5);
    context.lineTo(width - 245, Math.PI * 1.5);
    context.lineTo(width / 2, 35);
    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.stroke();
    context.fillStyle = "red";
    context.fill();
  }
}
