const setup = require("../setup.js");

setup.createInput("11");
const input = setup.getInput("11");
const grid = input.split("\n").map((line) => line.split(""));

// printGrid();

const pairsComplete = [];
const distances = [];

// check for empty rows
const emptyRowIndexes = [];
for (let i = 0; i < grid.length; i++) {
  if (new Set(grid[i]).size == 1) {
    emptyRowIndexes.push(i);
  }
}

emptyRowIndexes.forEach((index, i) => {
  addRow(index);
  for (let j = i; j < emptyRowIndexes.length; j++) {
    emptyRowIndexes[j]++;
  }
});

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

emptyColumnIndexes.forEach((index, i) => {
  addColumn(index);
  for (let j = i; j < emptyColumnIndexes.length; j++) {
    emptyColumnIndexes[j]++;
  }
});

const galexyMap = mapGalexies();
// printGrid();
// console.log(galexyMap);

for (let i = 0; i < galexyMap.length; i++) {
  for (let j = 0; j < galexyMap.length; j++) {
    if (i == j) continue;
    if (pairComplete([i, j].sort((a, b) => a - b))) continue;

    distances.push({
      a: i,
      b: j,
      distance: Math.abs(galexyMap[i].position.x - galexyMap[j].position.x) + Math.abs(galexyMap[i].position.y - galexyMap[j].position.y),
    });

    if (j % 50 == 0) {
      console.log(`Pair ${[i, j].sort((a, b) => a - b)} complete`);
    }

    pairsComplete.push([i, j].sort((a, b) => a - b));
  }
}

console.log(distances);
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
  let pairComplete = false;
  pairsComplete.forEach((item) => {
    if (item[0] == pair[0] && item[1] == pair[1]) pairComplete = true;
  });

  return pairComplete;
}
