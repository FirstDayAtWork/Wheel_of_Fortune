import { useEffect, useRef } from "react";
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

  const [wheelData] = useStorage<WheelData>(
    {
      idCounter: 0,
      list: [],
    },
    "wheel_data",
  );

  const canvasWheelData = useRef<CanvasData[]>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasWheelData.current && settings.isSpinning) {
      spinWheel(canvasWheelData.current, settings.duration);
      updateSpinningStatus(false);
    }
  }, [settings.isSpinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasReference.current) {
      canvasWheelData.current = createCanvas(canvasReference.current, wheelData);

      if (canvasWheelData.current) {
        draw(canvasWheelData.current, 0);
      }
    }
  }, []);

  return (
    <div className="max-w-lg self-center">
      <canvas ref={canvasReference}></canvas>
    </div>
  );
}
