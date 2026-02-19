import type { WheelDataList } from "./wheel-data";

export function dataToCSV(data: WheelDataList[]) {
  let res = "";

  for (const value of data) {
    res += `${value.title} | ${value.weight}\n`;
  }

  return res;
}
