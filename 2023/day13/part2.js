const setup = require("../setup.js");

// setup.createInput("13");
const input = setup.getInput("13");
const puzzles = input.split("\n\n");
const reflectionMap = {};

let summary = 0;

puzzles.forEach((puzzle, index) => {
  // if (index != 1) return;

  const grid = puzzle.split("\n").map((line) => line.split(""));
  InitialReflections(grid, index);
  // console.log(reflectionMap);
  // const smudgedGrid = smudgeGrid(grid, 4, 0);
  // printGrid(smudgedGrid, 5, 0);
  // SmudgedReflection(smudgedGrid, index);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const smudgedGrid = smudgeGrid(grid, x, y);
      if (SmudgedReflection(smudgedGrid, index, x, y)) return;
      // return;
    }
  }
});

console.log(`Summary: ${summary}`);
// console.log(reflectionMap);

function isReflective(puzzle, index, axis) {
  // console.log(`\nindex: ${index}, axis: ${axis}`);
  let lower = index;
  let upper = index + 1;

  // console.log(`starting lower: ${lower}`);
  // console.log(`starting upper: ${upper}`);

  if (axis == "x") {
    for (let i = 0; lower >= 0 && upper < puzzle.length; i++) {
      const row1 = puzzle[lower];
      const row2 = puzzle[upper];

      for (let j = 0; j < puzzle[0].length; j++) {
        if (row1[j] != row2[j]) {
          // console.log(`Rows ${lower} and ${upper}: col ${j} - ${row1[j]} didn't match ${row2[j]}`);
          return false;
        }
      }

      lower--;
      upper++;
    }
  }

  if (axis == "y") {
    for (let i = 0; lower >= 0 && upper < puzzle[0].length; i++) {
      const col1 = getColumn(puzzle, lower);
      const col2 = getColumn(puzzle, upper);

      for (let j = 0; j < puzzle.length; j++) {
        if (col1[j] != col2[j]) {
          // console.log(`Cols ${lower} and ${upper}: row ${j} - ${col1[j]} didn't match ${col2[j]}`);
          return false;
        }
      }

      lower--;
      upper++;
    }
  }

  return true;
}

function getColumn(grid, i) {
  return grid.map((_, index) => grid[index][i]);
}

function InitialReflections(grid, index) {
  for (let x = 0; x < grid[0].length - 1; x++) {
    if (isReflective(grid, x, "y")) {
      reflectionMap[`${index}`] = {
        axis: "x",
        index: x + 1,
      };
    }
  }

  for (let y = 0; y < grid.length - 1; y++) {
    if (isReflective(grid, y, "x")) {
      reflectionMap[`${index}`] = {
        axis: "y",
        index: y + 1,
      };
    }
  }
}

function SmudgedReflection(grid, index, smudgeX, smudgeY) {
  for (let x = 0; x < grid[0].length - 1; x++) {
    if (isReflective(grid, x, "y") && !(reflectionMap[`${index}`].axis == "x" && reflectionMap[`${index}`].index == x + 1)) {
      console.log(`Smudged grid is reflective at axis y on row ${x + 1}`);
      summary += x + 1;
      return true;
    }
  }

  for (let y = 0; y < grid.length - 1; y++) {
    if (isReflective(grid, y, "x") && !(reflectionMap[`${index}`].axis == "y" && reflectionMap[`${index}`].index == y + 1)) {
      console.log(`Smudged grid is reflective at axis x on row ${y + 1}`);
      summary += 100 * (y + 1);
      return true;
    }
  }

  return false;
}

function smudgeGrid(grid, x, y) {
  const gridCopy = JSON.parse(JSON.stringify(grid));
  gridCopy[y][x] == "#" ? (gridCopy[y][x] = ".") : (gridCopy[y][x] = "#");
  return gridCopy;
}

function printGrid(grid, highlightX = null, highlightY = null) {
  console.log();

  if (!highlightX && !highlightY) console.log(grid.map((item) => item.join("")).join("\n"));

  console.log(
    grid
      .map((item, index) => {
        if (index != highlightY) return item.join("");
        return `${item
          .map((char, index) => {
            if (index == highlightX) return `\x1b[32m${char}\x1b[0m`;
            return char;
          })
          .join("")}`;
      })
      .join("\n")
  );

  console.log();
}
