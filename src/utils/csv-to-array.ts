import type { WheelDataList } from "./wheel-data";

export function csvToArray(csv: string): Omit<WheelDataList, "id" | "hash">[] {
  return csv
    .trim()
    .split("\n")
    .map((line) => {
      const [title, weight] = line.split("|").map((s) => s.trim());

      return {
        title,
        weight: +weight,
      };
    });
}
