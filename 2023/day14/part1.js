const setup = require("../setup.js");

setup.createInput("14");
const input = setup.getInput("14");
const grid = input.split("\n").map((item) => item.split(""));
const platformLength = grid.length;

const rockMap = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] == "O") {
      console.log(`\nrock at ${x},${y}`);
      const stopOrd = getStopOrd(grid, x, y);
      const rocksInRange = getRocksInRange(grid, x, y, stopOrd);

      rockMap.push({
        position: {
          x: x,
          y: y,
        },
        stopPosition: {
          x: stopOrd[0],
          y: stopOrd[1],
        },
        rocksInRange: rocksInRange,
        finalPosition: {
          x: x,
          y: stopOrd[1] + rocksInRange,
        },
      });
    }
  }
}

let load = 0;
rockMap.forEach((item) => {
  load += platformLength - item.finalPosition.y;
});

console.log(load);

function getStopOrd(grid, x, y) {
  while (y != 0) {
    y--;

    if (grid[y][x] == "#") return [x, y + 1];
  }

  return [x, 0];
}

function getRocksInRange(grid, x, y, stopOrd) {
  let rocks = 0;
  while (y != stopOrd[1]) {
    y--;

    if (grid[y][x] == "O") rocks++;
  }

  return rocks;
}
