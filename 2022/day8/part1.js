const fs = require("fs");
const chalk = require("chalk");

const setup = require("../setup");
let input = setup.getInput("8");

let rows = input.split("\n");

let grid = rows.map((row) => row.split(""));

let visibleTrees = 0;

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    if (isVisible("TOP", [x, y]) || isVisible("BOTTOM", [x, y]) || isVisible("RIGHT", [x, y]) || isVisible("LEFT", [x, y])) {
      visibleTrees++;
    }
  }
}

console.log(visibleTrees + grid.length * 2 + grid[0].length * 2 - 4);

function getTree(x, y) {
  return grid[y][x];
}

function isVisible(direction, ords) {
  let currentOrds = [...ords];
  switch (direction) {
    case "TOP":
      while (currentOrds[1] > 0) {
        currentOrds[1]--;
        if (getTree(currentOrds[0], currentOrds[1]) >= getTree(ords[0], ords[1])) return false;
      }
      return true;
    case "BOTTOM":
      while (currentOrds[1] < grid.length - 1) {
        currentOrds[1]++;
        if (getTree(currentOrds[0], currentOrds[1]) >= getTree(ords[0], ords[1])) return false;
      }
      return true;
    case "LEFT":
      while (currentOrds[0] > 0) {
        currentOrds[0]--;
        if (getTree(currentOrds[0], currentOrds[1]) >= getTree(ords[0], ords[1])) return false;
      }
      return true;
    case "RIGHT":
      while (currentOrds[0] < grid.length - 1) {
        currentOrds[0]++;
        if (getTree(currentOrds[0], currentOrds[1]) >= getTree(ords[0], ords[1])) return false;
      }
      return true;
  }
}
