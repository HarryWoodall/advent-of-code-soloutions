const setup = require("../setup.js");

setup.createInput("11");
const input = setup.getInput("11");
const grid = input.split("\n").map((line) => line.split(""));

// printGrid();

const pairsComplete = {};
const distances = [];
const ammount = 1000000;

// check for empty rows
const emptyRowIndexes = [];
for (let i = 0; i < grid.length; i++) {
  if (new Set(grid[i]).size == 1) {
    emptyRowIndexes.push(i);
  }
}

// check for empty columns
const emptyColumnIndexes = [];
for (let i = 0; i < grid[0].length; i++) {
  const currentColumn = [];
  for (let j = 0; j < grid.length; j++) {
    currentColumn.push(grid[j][i]);
  }

  if (new Set(currentColumn).size == 1) {
    emptyColumnIndexes.push(i);
  }
}

const galexyMap = mapGalexies();

for (let i = 0; i < galexyMap.length; i++) {
  for (let j = 0; j < galexyMap.length; j++) {
    if (i == j) continue;
    if (pairComplete([i, j])) continue;

    let distance = Math.abs(galexyMap[i].position.x - galexyMap[j].position.x) + Math.abs(galexyMap[i].position.y - galexyMap[j].position.y);

    let xDiff = [galexyMap[i].position.x, galexyMap[j].position.x].sort((a, b) => a - b);
    let yDiff = [galexyMap[i].position.y, galexyMap[j].position.y].sort((a, b) => a - b);

    for (let k = xDiff[0]; k < xDiff[1]; k++) {
      if (emptyColumnIndexes.includes(k)) distance += ammount - 1;
    }

    for (let k = yDiff[0]; k < yDiff[1]; k++) {
      if (emptyRowIndexes.includes(k)) distance += ammount - 1;
    }

    distances.push({
      a: i,
      b: j,
      distance: distance,
    });

    if (j % 50 == 0) {
      console.log(`Pair ${[i, j].sort((a, b) => a - b)} complete`);
    }

    pairsComplete[[i, j].sort((a, b) => a - b).join("-")] = true;
  }
}

// console.log(distances);
console.log(distances.length);

console.log(`Sum: ${distances.map((d) => d.distance).reduce((acc, a) => acc + a, 0)}`);

function addRow(index) {
  grid.splice(index, 0, Array(grid[0].length).fill("."));
}

function addColumn(index) {
  grid.forEach((row) => {
    row.splice(index, 0, ".");
  });
}

function mapGalexies() {
  let currentId = 0;
  const map = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == "#") {
        map.push({
          id: currentId,
          position: { x: x, y: y },
        });
        currentId++;
      }
    }
  }

  return map;
}

function printGrid() {
  console.log(grid.map((row) => row.join("")).join("\n"));
  console.log();
}

function pairComplete(pair) {
  return pair.sort((a, b) => a - b).join("-") in pairsComplete;
}
