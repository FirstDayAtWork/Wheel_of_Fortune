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
  wheelOptions: WheelOptions,
) {
  let startOfSegment = currentDegre;
  let endOfSegment = 0;

  const sectionNumber = lsData.list.length;
  const array: string[] = lsData.list.map((element) => element.title);
  const weight: number[] = lsData.list.map((element) => +element.weight);
  const total = lsData.list.reduce((a, b) => a + +b.weight, 0);

  let sizeOfSection = 0;

  for (let index = 0; index < sectionNumber; index += 1) {
    sizeOfSection = (360 * weight[index]) / total;
    endOfSegment = sizeOfSection + startOfSegment;

    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.arc(
      width / 2,
      height / 2,
      radius,
      ((Math.PI * 2) / 360) * startOfSegment,
      ((Math.PI * 2) / 360) * endOfSegment,
    );

    context.fillStyle = `rgb(${colors[index].red}, ${colors[index].green}, ${colors[index].blue})`;
    context.lineWidth = 2;
    context.strokeStyle = "white";
    context.closePath();
    context.fill();
    context.stroke();
    context.save();

    context.translate(width / 2, height / 2);
    context.font = "22px monospace";
    context.fillStyle = "white";
    context.textAlign = "center";

    wheelOptions[array[index]] = {
      title: array[index],
      start: Math.floor(startOfSegment % 360),
      end: Math.floor(endOfSegment % 360),
    };

    const center = Math.PI * 1.5 * (180 / Math.PI);

    // for (const element of Object.keys(wheelOptions)) {
    //   if (wheelOptions[element].start < center && wheelOptions[element].end > center) {
    //     (arrayOfDomElements[4] as HTMLInputElement).value = wheelOptions[element].title;
    //   }
    // }

    startOfSegment += sizeOfSection;
    endOfSegment += sizeOfSection;

    const degree = (Math.PI / 180) * (startOfSegment + (startOfSegment - endOfSegment) / 2);

    context.rotate(degree);
    const sliceOfText = array[index].length > 7 ? `${array[index].slice(0, 7)} ...` : array[index];

    context.fillText(sliceOfText, 130, 0);
    context.restore();
  }
}
