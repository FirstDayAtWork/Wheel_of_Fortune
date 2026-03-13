import type { WheelData } from "../wheel-data";
import type { WheelOptions } from "./types";

export function calculateTargetRotation(
  backendNumber: number,
  trueCords: WheelOptions,
  lsData: WheelData,
): number {
  let cumStart = 0;

  for (let i = 0; i < lsData.list.length; i++) {
    const weight = +lsData.list[i].weight * 100;
    const cumEnd = cumStart + weight;

    if (backendNumber >= cumStart && backendNumber < cumEnd) {
      const seg = trueCords[lsData.list[i].title];

      const e = seg.end < seg.start ? seg.end + 360 : seg.end;
      const segmentSize = e - seg.start;

      const randomOffset = (Math.random() * 0.6 + 0.2) * segmentSize;

      const targetPointInSegment = (seg.start + segmentSize - randomOffset) % 360;

      return (270 - targetPointInSegment + 360) % 360;
    }

    cumStart = cumEnd;
  }

  return 0;
}
