import { useEffect, useRef } from "react";
import { useStorage } from "@/hooks/useStorage";
import { createCanvas } from "@/utils/canvas/create-canvas";
import { draw } from "@/utils/canvas/draw";
import { getWinner } from "@/utils/canvas/get-winner";
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
  const canvasWheelData = useRef<CanvasData[]>(null);
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
      }
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!canvasWheelData.current || !settings.isSpinning) return;

    spinWheel(canvasWheelData.current, settings.duration);

    const timeoutId = setTimeout(
      () => {
        updateSpinningStatus(false);
      },
      settings.duration * 1000 + 200,
    );

    return () => clearTimeout(timeoutId);
  }, [settings.isSpinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let animationId: number;

    function updateWinner() {
      if (!settings.isSpinning || !canvasWheelData.current) return;

      const winner = getWinner(canvasWheelData.current[2]);
      updateFeedback(winner);

      animationId = requestAnimationFrame(updateWinner);
    }

    if (settings.isSpinning) {
      updateWinner();
    }

    return () => cancelAnimationFrame(animationId);
  }, [settings.isSpinning]);

  return (
    <div className="max-w-lg self-center">
      <canvas ref={canvasReference}></canvas>
    </div>
  );
}
