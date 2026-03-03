import { useEffect, useRef } from "react";
import { getRandomNumber } from "@/api/get-random-number";
import { useStorage } from "@/hooks/useStorage";
import { createCanvas } from "@/utils/canvas/create-canvas";
import { draw } from "@/utils/canvas/draw";
import { spinWheel } from "@/utils/canvas/spin-wheel";
import type { CanvasData } from "@/utils/canvas/types";
import type { Settings, WheelData } from "@/utils/wheel-data";

type WheelCanvasProps = {
  updateFeedback: (newValue: string) => void;
  updateSpinningStatus: (newStatus: boolean) => void;
  settings: Settings;
};

export default function WheelCanvas(props: WheelCanvasProps) {
  const { settings, updateSpinningStatus, updateFeedback } = props;

  const canvasReference = useRef<HTMLCanvasElement>(null);
  const canvasWheelData = useRef<CanvasData>(null);
  const [wheelData] = useStorage<WheelData>(
    {
      idCounter: 0,
      list: [],
    },
    "wheel_data",
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasReference.current) {
      canvasWheelData.current = createCanvas(canvasReference.current, wheelData);

      if (canvasWheelData.current) {
        draw(canvasWheelData.current, 0);
        canvasWheelData.current[0].trueCords = { ...canvasWheelData.current[2] };
      }
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!canvasWheelData.current || !settings.isSpinning) return;

    (async () => {
      if (!canvasWheelData.current) return;
      const totalWeight = canvasWheelData?.current[0].lsData.list.reduce((a, b) => a + b.weight, 0);

      const numFromApi = await getRandomNumber(totalWeight);

      spinWheel(canvasWheelData.current, settings.duration, numFromApi, () => {
        updateSpinningStatus(false);
        if (!canvasWheelData.current) return;
        canvasWheelData.current[0].trueCords = { ...canvasWheelData.current[2] };
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
