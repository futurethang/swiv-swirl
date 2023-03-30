import { createNoise3D } from "./node_modules/simplex-noise/dist/esm/simplex-noise.js";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let gridWidth = 30;
let gridRatio = 70;
let gridSize;
const aNoise = new createNoise3D();
let t1 = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  gridSize = {
    x: Math.round(canvas.width / gridWidth),
    y: Math.round(canvas.height / gridWidth)
  };
  gridRatio = Math.max(gridSize.x, gridSize.y);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function ratioToPixel(ratioX, ratioY) {
  return { x: canvas.width * ratioX, y: canvas.height * ratioY };
}

function draw() {
  const start = { r: 0, g: 0, b: 0 };
  const end = { r: 11, g: 55, b: 169 };

  for (let i = 0; i < gridSize.x; i++) {
    for (let j = 0; j < gridSize.y; j++) {
      const ratio = (j + 0.5) * gridWidth / canvas.height;

      const r = Math.round(ratio * end.r + (1 - ratio) * start.r);
      const g = Math.round(ratio * end.g + (1 - ratio) * start.g);
      const b = Math.round(ratio * end.b + (1 - ratio) * start.b);
      context.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
      context.fillRect(
        i * gridWidth,
        j * gridWidth,
        gridWidth + 1,
        gridWidth + 1
      );

      const a = aNoise(i / gridRatio, j / gridRatio, t1) * 0.5 + 0.5;
      context.fillStyle = `rgba(${Math.round(a * 26)}, ${Math.round(
        a * 206
      )}, ${Math.round(a * 188)}, ${a * 0.8})`;
      context.fillRect(
        i * gridWidth,
        j * gridWidth,
        gridWidth + 1,
        gridWidth + 1
      );
    }
  }
}

function gameLoop() {
  context.fillStyle = `black`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  draw();

  t1 += 1 / (gridRatio * 8);
}

setInterval(gameLoop, 16);
