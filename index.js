import { Maze, Cell } from "maze_gen_basics";
import { memory } from "maze_gen_basics/maze_gen_basics_bg";

const CELL_SIZE = 50;
const GRID_COLOR = "BLACK";

const edges = [];
const ignored = [];

let maze = Maze.new();
let width = maze.width();
let height = maze.height();


// let canvas = document.getElementById("maze-canvas");
// canvas.width = (CELL_SIZE + 1) * width + 1;
// canvas.height = (CELL_SIZE + 1) * height + 1;

// const ctx = canvas.getContext("2d");

let pretext = document.getElementById("pre-render");
let visited = document.getElementById("visited");
// Render Loop
const renderLoop = () => {
  pretext.textContent = maze.render();
  visited.textContent = maze.get_visited();
  maze.gen_maze();

  setTimeout(() => {
    requestAnimationFrame(renderLoop);
  }, 50);
};


// Get index
const get_index = (row, column) => {
  return row * width + column;
};


renderLoop();
