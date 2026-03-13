import { easeInOutBack } from "./animation-fn";
import { calculateTargetRotation } from "./calculate-target-rotation";
import { draw } from "./draw";
import { getWinner } from "./get-winner";
import type { CanvasData } from "./types";

export function spinWheel(
  canvasData: CanvasData,
  duration: number,
  numFromApi: number,
  onComplete: () => void,
) {
  const [options] = canvasData;

  const rotationDistance = calculateTargetRotation(numFromApi, options.trueCords, options.lsData);

  const fullSpins = 360 * 5;
  const totalDistToTravel = fullSpins + rotationDistance;

  const startRotation = options.currentRotation;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = (currentTime - startTime) / (duration * 1000);

    if (elapsed >= 1) {
      const finalAngle = (startRotation + totalDistToTravel) % 360;
      options.currentRotation = finalAngle;

      draw(canvasData, finalAngle);
      onComplete();
      return;
    }

    const progress = easeInOutBack(elapsed);
    const currentAngle = startRotation + totalDistToTravel * progress;

    draw(canvasData, currentAngle % 360);

    const currentWinner = getWinner(canvasData[2]);
    window.dispatchEvent(new CustomEvent("wheelUpdate", { detail: currentWinner }));

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
