export function drawWheel(context: CanvasRenderingContext2D, width: number, radius: number) {
  context.beginPath();
  context.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
  context.lineWidth = 6;
  context.strokeStyle = "white";
  context.stroke();
}
