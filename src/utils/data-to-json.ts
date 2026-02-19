import type { WheelDataList } from "./wheel-data";

export function dataToJSON(data: WheelDataList[]) {
  return data.map((item) => {
    return {
      title: item.title,
      weight: item.weight,
    };
  });
}
