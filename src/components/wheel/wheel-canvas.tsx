import { useEffect, useRef } from "react";
import { getRandomNumber } from "@/api/get-random-number";
import { createCanvas } from "@/utils/canvas/create-canvas";
import { draw } from "@/utils/canvas/draw";
import { spinWheel } from "@/utils/canvas/spin-wheel";
import type { CanvasData } from "@/utils/canvas/types";
import { filterByValues } from "@/utils/filter-by-keys";
import type { Settings, WheelData, WheelDataList } from "@/utils/wheel-data";

type WheelCanvasProps = {
  updateFeedback: (newValue: string) => void;
  updateSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  handleDialogOpen: (open: boolean) => void;
  settings: Settings;
  size: number;
  wheelData: WheelData;
  eliminationList: WheelDataList["hash"][];
};

export default function WheelCanvas(props: WheelCanvasProps) {
  const {
    settings,
    size,
    updateSettings,
    updateFeedback,
    handleDialogOpen,
    wheelData,
    eliminationList,
  } = props;

  const canvasReference = useRef<HTMLCanvasElement>(null);
  const canvasWheelData = useRef<CanvasData>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasReference.current) {
      const data =
        settings.mode === "elimination" && eliminationList.length > 0
          ? {
              idCounter: wheelData.idCounter,
              list: filterByValues(eliminationList, "hash", wheelData.list),
            }
          : wheelData;

      canvasWheelData.current = createCanvas(canvasReference.current, data, size);

      if (canvasWheelData.current) {
        draw(canvasWheelData.current, 0);
        canvasWheelData.current[0].trueCords = { ...canvasWheelData.current[2] };
      }
    }
  }, [settings.mode, eliminationList]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!canvasWheelData.current || !settings.isSpinning) return;

    (async () => {
      if (!canvasWheelData.current) return;
      canvasWheelData.current[0].totalWeight = canvasWheelData?.current[0].lsData.list.reduce(
        (a, b) => a + b.weight,
        0,
      );

      const numFromApi = await getRandomNumber(canvasWheelData.current[0].totalWeight);

      spinWheel(canvasWheelData.current, settings.duration, numFromApi, () => {
        updateSettings("isSpinning", false);
        handleDialogOpen(true);
        if (!canvasWheelData.current) return;

        canvasWheelData.current[0].trueCords = { ...canvasWheelData.current[2] };

        canvasWheelData.current[0].lsData =
          settings.mode === "elimination" && eliminationList.length > 0
            ? {
                idCounter: wheelData.idCounter,
                list: filterByValues(eliminationList, "hash", wheelData.list),
              }
            : wheelData;
      });
    })();
  }, [settings.isSpinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleWheelUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      updateFeedback(customEvent.detail);
    };

    window.addEventListener("wheelUpdate", handleWheelUpdate);
    return () => window.removeEventListener("wheelUpdate", handleWheelUpdate);
  }, []);

  return (
    <div className="self-center aspect-square">
      <canvas ref={canvasReference} className="w-full h-full block"></canvas>
    </div>
  );
}
