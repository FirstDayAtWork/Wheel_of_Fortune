import { easeInOutSine } from "./animation-fn";
import { draw } from "./draw";
import { getPercent } from "./get-percent";
import type { CanvasWheel, randomColors, WheelOptions } from "./types";

export function spinWheel(
  canvasData: (CanvasWheel & WheelOptions & randomColors[])[],
  duration: number,
) {
  let speed = 0;
  let currentDegre = 0;

  let maxRotation = Math.floor(Math.random() * (360 * 6 - 360 * 3 + 1)) + 360 * 3;

  const start = Date.now();
  const time = duration;

  function animate() {
    const currentTime = Math.floor((Date.now() - start) / 1000);

    if (currentTime >= time) {
      return;
    }

    speed = easeInOutSine(getPercent(currentDegre, maxRotation, 0)) * 20;

    if (speed < 0.05) {
      speed = 0;
    }

    currentDegre += speed;

    draw(canvasData, currentDegre);

    requestAnimationFrame(animate);
  }

  if (speed !== 0) return;
  currentDegre = 0;
  maxRotation = Math.floor(Math.random() * (360 * 6 - 360 * 3 + 1)) + 360 * 3 * time;

  requestAnimationFrame(animate);
}
