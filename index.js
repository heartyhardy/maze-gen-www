import { Maze, Cell } from "maze_gen_basics";
import { memory } from "maze_gen_basics/maze_gen_basics_bg";

const CELL_SIZE = 25;
const GRID_COLOR = "RGB(60,20,10)";
const BACK_COLOR = "DODGERBLUE";
const LINE_SIZE = 5;

const edges = [];
const ignored = [];

let maze = Maze.new();
let width = maze.width();
let height = maze.height();

let canvas = document.getElementById("maze-canvas");
canvas.width = (CELL_SIZE + 1) * width + 1;
canvas.height = (CELL_SIZE + 1) * height + 1;

const ctx = canvas.getContext("2d");
ctx.strokeStyle = GRID_COLOR;
ctx.lineWidth = LINE_SIZE;
ctx.fillStyle = BACK_COLOR;

//Track gradient
var track_fill = ctx.createLinearGradient(
  0,
  0,
  CELL_SIZE * width,
  CELL_SIZE * height
);

track_fill.addColorStop(0, "BURLYWOOD");
track_fill.addColorStop(0.5, "ROSYBROWN");
track_fill.addColorStop(1, "PERU");

// Shadow effects
ctx.shadowColor = "black";
ctx.shadowBlur = 5;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;

// Render Loop
const renderLoop = () => {
  draw_walls();
  render_head();
  maze.gen_maze();

  setTimeout(() => {
    requestAnimationFrame(renderLoop);
  }, 50);
};

//Draw walls
const draw_walls = () => {
  let cellsPtr = maze.cells();
  let cells = new Uint8Array(memory.buffer, cellsPtr, width * height * 5);
  ctx.clearRect(0, 0, CELL_SIZE * width * 2, CELL_SIZE * height * 2);
  ctx.fillStyle = "SADDLEBROWN";
  ctx.fillRect(0, 0, CELL_SIZE * width, CELL_SIZE * height);

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let visited_idx = get_index(r, c) * 5;

      if (cells[visited_idx] == 1) {
        ctx.fillStyle = track_fill;
        ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      for (let k = 1; k < 5; k++) {
        if (cells[visited_idx + k] && k === 1) {
          ctx.beginPath();
          ctx.moveTo(c * CELL_SIZE, r * CELL_SIZE);
          ctx.lineTo(c * CELL_SIZE + CELL_SIZE, r * CELL_SIZE);
          ctx.stroke();
        }
        if (cells[visited_idx + k] && k === 2) {
          ctx.beginPath();
          ctx.moveTo(c * CELL_SIZE + CELL_SIZE, r * CELL_SIZE);
          ctx.lineTo(c * CELL_SIZE + CELL_SIZE, r * CELL_SIZE + CELL_SIZE);
          ctx.stroke();
        }
        if (cells[visited_idx + k] && k === 3) {
          ctx.beginPath();
          ctx.moveTo(c * CELL_SIZE, r * CELL_SIZE + CELL_SIZE);
          ctx.lineTo(c * CELL_SIZE + CELL_SIZE, r * CELL_SIZE + CELL_SIZE);
          ctx.stroke();
        }
        if (cells[visited_idx + k] && k === 4) {
          ctx.beginPath();
          ctx.moveTo(c * CELL_SIZE, r * CELL_SIZE);
          ctx.lineTo(c * CELL_SIZE, r * CELL_SIZE + CELL_SIZE);
          ctx.stroke();
        }
      }
    }
  }
};

// Draw filled cells
const render_head = () => {
  let head = maze.get_head();
  let r = parseInt(head / width);
  let c = head % width;

  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  ctx.font = "30px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🧙‍♂️", c * CELL_SIZE + CELL_SIZE / 2, r * CELL_SIZE);

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // ctx.fillStyle="DODGERBLUE";
  // ctx.strokeStyle="CORNFLOWERBLUE";
  // ctx.fillRect(c*CELL_SIZE + 2,r*CELL_SIZE+2,CELL_SIZE-2,CELL_SIZE-2);
  // ctx.rect(c*CELL_SIZE,r*CELL_SIZE,CELL_SIZE,CELL_SIZE);
  // ctx.stroke();
  // ctx.strokeStyle=GRID_COLOR;
};

// Get index
const get_index = (row, column) => {
  return row * width + column;
};

// Render loop with RequestAnimationFrame
renderLoop();
