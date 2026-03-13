export function drawCircle(context: CanvasRenderingContext2D, width: number) {
  context.beginPath();
  context.arc(width / 2, width / 2, width / 12, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.strokeStyle = "oklch(0.985 0.002 247.839)";
  context.stroke();
  context.fillStyle = "oklch(0.21 0.034 264.665)";
  context.fill();
}
