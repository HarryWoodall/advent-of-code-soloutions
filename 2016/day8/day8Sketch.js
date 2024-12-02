let data;
let canvasWidth = 700;
let canvasHeight = 200;
let commands = [];
let grid = [];
let lastGrid = [];
let commandIndex = 0;

let rectsExecuted = {
  ammount: 0,
  area: 0,
};
let rotateColsExecuted = 0;
let rotateRowsExecuted = 0;

function preload() {
  data = loadStrings("../input/8.txt");
}

function setup() {
  for (let rawCommand of data) {
    commands.push(commandFactory(rawCommand));
  }

  setUpGrid(50, 6);
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(50);
  nextCommand();

  if (!hasNextCommand()) {
    noLoop();
    console.log(gridCellsLit());
  }
  drawGrid();
}

function hasNextCommand() {
  return commandIndex < commands.length;
}

function nextCommand() {
  if (commandIndex < commands.length) {
    console.log(`executing command ${commandIndex + 1}`);
    console.log(JSON.stringify(commands[commandIndex]));
    console.log(data[commandIndex]);
    console.log();
    executeCommand(commands[commandIndex]);
    if (compareGrids()) {
      console.log(`no change since last command`);
    }
    commandIndex++;
  } else {
    console.log("no more commands");
    console.log("cells lit", gridCellsLit());
  }
}

function runCommands(upTo) {
  while (commandIndex < upTo) {
    nextCommand();
  }

  console.log(`${gridCellsLit()} lit`);
}

function mouseClicked() {
  if (hasNextCommand()) {
    console.log(JSON.stringify(commands[commandIndex], null, 2));
    nextCommand();
  }
}

function compareGrids() {
  var changes = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (lastGrid[y][x] != grid[y][x]) {
        return false;
      }
    }
  }

  if (changes > 0) {
    console.log(`${changes} since last command`);
  }
  return changes == 0;
}

function gridCellsLit() {
  let cellsLit = 0;
  let cellsUnlit = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x]) {
        cellsLit++;
      } else {
        cellsUnlit++;
      }
    }
  }
  return cellsLit;
}

function drawGrid() {
  const cellWidth = canvasWidth / grid[0].length;
  const cellHeight = (canvasHeight - 50) / grid.length;

  stroke(255);
  fill(255);
  strokeWeight(0.1);
  textFont("Courier New");
  textSize(15);

  text(`command: ${commandIndex}`, 0, 20);

  textSize(10);

  for (let x = 0; x < grid[0].length; x++) {
    text(x, (x * canvasWidth) / 50 + 3, 45);
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      noFill();
      stroke(150);
      strokeWeight(0.25);

      if (grid[y][x]) {
        fill(100, 250, 100);
      } else {
        noFill();
      }
      rect(x * cellWidth, y * cellHeight + 50, cellWidth, cellHeight);
    }
  }
}

function drawRect(x, y) {
  for (let currentHeight = 0; currentHeight < y; currentHeight++) {
    for (let currentWidth = 0; currentWidth < x; currentWidth++) {
      grid[currentHeight][currentWidth] = true;
    }
  }
}

function executeCommand(command) {
  lastGrid = JSON.parse(JSON.stringify(grid));
  if (command.type == "RECT") {
    rectsExecuted.ammount++;
    rectsExecuted.area += command.valueA * command.valueB;
    drawRect(command.valueA, command.valueB);
  }

  if (command.type == "ROTATE") {
    if (command.ternary == "ROW") {
      rotateRowsExecuted++;
      shiftRow(command.valueA, command.valueB);
    } else {
      rotateColsExecuted++;
      shiftCol(command.valueA, command.valueB);
    }
  }
}

function shiftRow(index, ammount) {
  grid[index] = arrayRotate(grid[index], ammount);
}

function shiftCol(index, ammount) {
  let col = [];
  for (let i = 0; i < grid.length; i++) {
    col.push(grid[i][index]);
  }

  col = arrayRotate(col, ammount);

  for (let i = 0; i < grid.length; i++) {
    grid[i][index] = col[i];
  }
}

function arrayRotate(arr, ammount) {
  for (let i = 0; i < ammount; i++) {
    arr.unshift(arr.pop());
  }
  return arr;
}

function commandFactory(command) {
  const tokens = command.split(" ");

  switch (tokens[0]) {
    case "rect":
      return {
        type: "RECT",
        valueA: parseInt(tokens[1].split("x")[0]),
        valueB: parseInt(tokens[1].split("x")[1]),
      };
    case "rotate":
      return {
        type: "ROTATE",
        ternary: tokens[1].toUpperCase(),
        valueA: parseInt(tokens[2].split("=")[1]),
        valueB: parseInt(tokens[4]),
      };
  }
}

function setUpGrid(width, height) {
  let gridRow = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      gridRow.push(false);
    }
    grid.push(gridRow);
    gridRow = [];
  }
}
