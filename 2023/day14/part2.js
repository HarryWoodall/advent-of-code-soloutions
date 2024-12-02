const setup = require("../setup.js");

// setup.createInput("14");
const input = setup.getInput("14-test");
const gridInput = input.split("\n").map((item) => item.split(""));
const platformLength = gridInput.length;

class Grid {
  constructor() {
    this.rocks = [];
    this.cubes = [];

    for (let y = 0; y < gridInput.length; y++) {
      for (let x = 0; x < gridInput[0].length; x++) {
        if (gridInput[y][x] == "#") {
          this.cubes.push({ x: x, y: y });
        }

        if (gridInput[y][x] == "O") {
          this.rocks.push({ x: x, y: y });
        }
      }
    }
  }

  getRockIndexAtPosition({ x, y }) {
    return this.rocks.findIndex((obj) => obj.x == x && obj.y == y);
  }

  getCubesOnXAxis(yOrd) {
    return this.cubes.filter((cube) => cube.y == yOrd);
  }

  getCubesOnYAxis(xOrd) {
    return this.cubes.filter((cube) => cube.x == xOrd);
  }

  setRockPosition(rock, pos) {
    let index = this.getRockIndexAtPosition(rock);
    this.rocks[index] = pos;
  }
}

const grid = new Grid();

const cubeMap = [];
let rockMap = [];
const directions = ["N", "W", "S", "E"];
// const directions = ["N", "W", "S"];

directions.map((dir) => {
  rockMap = [];

  grid.rocks.forEach((rock) => {
    const stopOrd = getStopOrd(rock, dir);
    // console.log(`found ord: `);
    // console.log(stopOrd);
    const rocksInRange = getRocksInRange(rock, stopOrd, dir);
    // console.log(rocksInRange);

    createRockMapping(rock, stopOrd, rocksInRange, dir);
    // printMap();
  });

  // for (let y = 0; y < grid.length; y++) {
  //   for (let x = 0; x < grid[0].length; x++) {
  //     if (grid[y][x] == "O") {
  //       const stopOrd = getStopOrd(grid, x, y, dir);
  //       const rocksInRange = getRocksInRange(grid, x, y, stopOrd, dir);

  //       createRockMapping(x, y, stopOrd, rocksInRange, dir);
  //     }
  //   }
  // }

  // let load = 0;
  // rockMap.forEach((item) => {
  //   load += platformLength - item.finalPosition.y;
  // });

  // console.log(load);

  printMap();
});

function createRockMapping(rock, stopOrd, rocksInRange, direction) {
  const finalPosition = {};
  switch (direction) {
    case "N":
      finalPosition.x = rock.x;
      finalPosition.y = stopOrd.y + rocksInRange;
      break;
    case "S":
      finalPosition.x = rock.x;
      finalPosition.y = stopOrd.y - rocksInRange;
      break;
    case "W":
      finalPosition.x = stopOrd.x + rocksInRange;
      finalPosition.y = rock.y;
      break;
    case "E":
      finalPosition.x = stopOrd.x - rocksInRange;
      finalPosition.y = rock.y;
      break;
  }

  // rockMap.push({
  //   position: rock,
  //   stopPosition: stopOrd,
  //   rocksInRange: rocksInRange,
  //   finalPosition: finalPosition,
  // });

  grid.setRockPosition(rock, finalPosition);

  // grid.rock;
  // grid[finalPosition.y][finalPosition.x] = "O";
}

function getStopOrd(rock, direction) {
  switch (direction) {
    case "N":
      return stopOrdNorth(rock);
    case "S":
      return stopOrdSouth(rock);
    case "W":
      return stopOrdWest(rock);
    case "E":
      return stopOrdEast(rock);
  }
}

function getRocksInRange(rock, stopOrd, direction) {
  switch (direction) {
    case "N":
      return rocksNorth(rock, stopOrd);
    case "S":
      return rocksSouth(rock, stopOrd);
    case "W":
      return rocksWest(rock, stopOrd);
    case "E":
      return rocksEast(rock, stopOrd);
  }
}

function stopOrdNorth(rock) {
  let cubes = grid
    .getCubesOnYAxis(rock.x)
    ?.filter((cube) => cube.y < rock.y)
    ?.sort((a, b) => Math.abs(rock.y - a.y) - Math.abs(rock.y - b.y));

  if (cubes.length) return { x: rock.x, y: cubes[0].y + 1 };

  return { x: rock.x, y: 0 };
}

function stopOrdSouth(rock) {
  let cubes = grid
    .getCubesOnYAxis(rock.x)
    ?.filter((cube) => cube.y > rock.y)
    ?.sort((a, b) => Math.abs(rock.y - a.y) - Math.abs(rock.y - b.y));

  if (cubes.length) return { x: rock.x, y: cubes[0].y - 1 };

  return { x: rock.x, y: gridInput.length - 1 };
}

function stopOrdWest(rock) {
  let cubes = grid
    .getCubesOnXAxis(rock.y)
    ?.filter((cube) => cube.x < rock.x)
    ?.sort((a, b) => Math.abs(rock.x - a.x) - Math.abs(rock.x - b.x));

  if (cubes.length) return { x: cubes[0].x + 1, y: rock.y };

  return { x: 0, y: rock.y };
}

function stopOrdEast(rock) {
  let cubes = grid
    .getCubesOnXAxis(rock.y)
    ?.filter((cube) => cube.x > rock.x)
    ?.sort((a, b) => Math.abs(rock.x - a.x) - Math.abs(rock.x - b.x));

  if (cubes.length) return { x: cubes[0].x - 1, y: rock.y };

  return { x: gridInput[0].length - 1, y: rock.y };
}

function rocksNorth(rock, stopOrd) {
  return grid.rocks.filter((r) => r.x == rock.x && r.y >= stopOrd.y && rock.y > r.y).length;
}

function rocksSouth(rock, stopOrd) {
  return grid.rocks.filter((r) => r.x == rock.x && r.y <= stopOrd.y && rock.y < r.y).length;
}

function rocksWest(rock, stopOrd) {
  return grid.rocks.filter((r) => r.y == rock.y && r.x >= stopOrd.x && rock.x > r.x).length;
}

function rocksEast(rock, stopOrd) {
  return grid.rocks.filter((r) => r.y == rock.y && r.x <= stopOrd.x && rock.x < r.x).length;
}

function printMap() {
  const base = [];
  for (let y = 0; y < gridInput.length; y++) {
    base.push([]);
    for (let x = 0; x < gridInput[0].length; x++) {
      base[y].push(".");
    }
  }

  // console.log(grid);

  grid.rocks.forEach((rock, index) => {
    console.log(rock);
    base[rock.y][rock.x] = "0";
  });

  grid.cubes.forEach((cube) => (base[cube.y][cube.x] = "#"));

  console.log(base.map((item) => item.join("")).join("\n"), "\n");
}
