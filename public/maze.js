const size = 10;
const maze  = document.getElementById('my_maze');
let draw_maze = [];
const WALL = 999;

function generateMaze(arr){
  for(let i = 0; i < size; i++){
    arr[i] = [];
    for(let j = 0; j < size; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}


function goToRight(matrix, x, y) {
  if(y+1 === size){
    return false;
  }
  if(matrix[x][y+1] !== WALL && y + 1 < size -1){
    return true;
  }
  if(matrix[x][y+1] !== WALL && y+1 === size -1){
    return true;
  }
  return false;
}

function goToDown(matrix, x, y){
  if(x+1 === size){
    return false;
  }
  if(matrix[x+1][y] !== WALL && x + 1 < size -1){
    return true;
  }
  if(matrix[x + 1][y] !== WALL && x + 1 === size -1){
    return true;
  }
  return false;
}

window.onload  = function() {

  /*generate maze in html*/
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      maze.appendChild(cell);
    }
  }

/*  add obstacle */
const close = document.getElementsByClassName('cell');

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener('click', function() {
    close[i].classList.toggle('close');
  });
}

}

document.getElementById('get-in').onclick = function() {
  let load_maze = maze.getElementsByClassName('cell');
  draw_maze = generateMaze(draw_maze);
  let k = 0;
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
      if(load_maze[k].className === 'cell close'){
        draw_maze[i][j] = WALL;
      }
      k++;
    }
  }

  const startX = 0;
  const startY = 0;
  let currentX = startX;
  let currentY = startY;
  const endX = size - 1;
  const endY = size - 1;
  let path = [];
  let step = 0;

  while(step < 100){
    step ++;

    if(draw_maze[startX][startY] === WALL || draw_maze[endX][endY] === WALL){
      path = [];
      break;
    }

    if(goToRight(draw_maze, currentX, currentY)){
      path.push([currentX, currentY]);
      if(currentY < size -1){
        currentY = currentY + 1;
      }
    }
    else if(goToDown(draw_maze, currentX, currentY)){
      path.push([currentX, currentY]);
      if(currentX < size -1){
        currentX = currentX + 1;
      }
    }

    if(currentX === endX && currentY === endY){
      path.push([currentX, currentY]);
      break;
    }

    if(!goToRight(draw_maze, currentX, currentY) && !goToDown(draw_maze, currentX, currentY) &&
            currentX !== endX && currentY !== endY){
      path = [];
      break;
    }

    if(!goToRight(draw_maze, currentX, currentY) && !goToDown(draw_maze, currentX, currentY) &&
            currentX === endX && currentY !== endY){
      path = [];
      break;
    }

    if(!goToRight(draw_maze, currentX, currentY) && !goToDown(draw_maze, currentX, currentY) &&
            currentX !== endX && currentY === endY){
      path = [];
      break;
    }
  }

if(path.length > 0){
  for(let i = 0; i < path.length; i++){
    load_maze[path[i][0]*10 + path[i][1]].classList.toggle('path');
  }
} else {
  document.getElementById('answer').innerHTML = `<h3>Not path exist</h3>`;
}
}

document.getElementById('clear').onclick = function() {
  let clear_maze = maze.getElementsByClassName('cell');
  for(let i = 0; i < clear_maze.length; i++){
    if(clear_maze[i].className === 'cell close'){
      clear_maze[i].className = 'cell';
    }
    if(clear_maze[i].className === 'cell path'){
      clear_maze[i].className = 'cell';
    }
  }
  draw_maze = generateMaze(draw_maze);
  document.getElementById('answer').innerHTML = '';
}
