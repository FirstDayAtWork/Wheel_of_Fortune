export function drawArrow(context: CanvasRenderingContext2D, width: number) {
  const centerX = width / 2;
  const arrowWidth = 46;
  const arrowHeight = 60;
  const topY = 2;

  context.beginPath();
  context.moveTo(centerX - arrowWidth / 2, topY);
  context.lineTo(centerX + arrowWidth / 2, topY);
  context.lineTo(centerX, topY + arrowHeight);
  context.closePath();

  context.fillStyle = "oklch(0.645 0.246 16.439)";
  context.fill();

  context.lineWidth = 2;
  context.strokeStyle = "oklch(0.985 0.002 247.839)";
  context.lineJoin = "round";
  context.stroke();
}
