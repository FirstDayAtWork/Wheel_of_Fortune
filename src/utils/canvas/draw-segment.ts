import type { WheelData } from "../wheel-data";
import type { randomColors, WheelOptions } from "./types";

export function drawSegment(
  context: CanvasRenderingContext2D,
  radius: number,
  width: number,
  height: number,
  lsData: WheelData,
  currentDegre: number,
  colors: randomColors[],
): WheelOptions {
  const newWheelOptions: WheelOptions = {};
  let startOfSegment = currentDegre;

  const total = lsData.list.reduce((a, b) => a + +b.weight, 0);

  for (let index = 0; index < lsData.list.length; index++) {
    const item = lsData.list[index];
    const sizeOfSection = (360 * item.weight) / total;
    const endOfSegment = startOfSegment + sizeOfSection;

    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.arc(
      width / 2,
      height / 2,
      radius,
      (Math.PI / 180) * startOfSegment,
      (Math.PI / 180) * endOfSegment,
    );

    context.fillStyle = colors[index];
    context.lineWidth = 2;
    context.strokeStyle = "oklch(0.985 0.002 247.839)";
    context.closePath();
    context.fill();
    context.stroke();

    context.save();
    context.translate(width / 2, height / 2);
    const textAngle = (Math.PI / 180) * (startOfSegment + sizeOfSection / 2);
    context.rotate(textAngle);

    context.font = "22px monospace";
    context.fillStyle = "oklch(0.985 0.002 247.839)";
    context.textAlign = "center";
    const sliceOfText = item.title.length > 7 ? `${item.title.slice(0, 7)}...` : item.title;
    context.fillText(sliceOfText, height / 3, 7);
    context.restore();

    newWheelOptions[item.title] = {
      title: item.title,
      start: startOfSegment % 360,
      end: endOfSegment % 360,
    };

    startOfSegment = endOfSegment;
  }

  return newWheelOptions;
}
