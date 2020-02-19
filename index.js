import {Maze,Cell} from 'maze_gen_basics';
import {memory} from 'maze_gen_basics/maze_gen_basics_bg';

let maze = Maze.new();
let width = maze.width();
let height = maze.height();

maze.gen_maze();

let pretext = document.getElementById("fmt-display");
let visited_count = document.getElementById("visited-count");
let next_visited = document.getElementById("next-visited");
let has_next = document.getElementById("has-next");

const renderLoop =() =>{
    maze.gen_maze();
    pretext.textContent = maze.render();
    visited_count.textContent="visited count: " + maze.get_visited_count();
    // next_visited.textContent="next visited: "+maze.get_next_visited();
    // has_next.textContent="has next: "+maze.has_next();
    
    setTimeout(()=>{
        requestAnimationFrame(renderLoop);
    },1000);
}

renderLoop();


// let cellsPtr = maze.cells();
// let cells = new Uint8Array(memory.buffer, cellsPtr, width*height);
// console.log(cells);
