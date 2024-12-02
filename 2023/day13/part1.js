const setup = require("../setup.js");

// setup.createInput("13");
const input = setup.getInput("13");
const puzzles = input.split("\n\n");
const reflectionMap = {};

let summary = 0;

puzzles.forEach((puzzle, index) => {
  const grid = puzzle.split("\n").map((line) => line.split(""));

  for (let x = 0; x < grid[0].length - 1; x++) {
    if (isReflective(grid, x, "y")) {
      console.log(`grid ${index} is reflective in the y axis at col: ${x + 1}`);
      reflectionMap[`${index}`] = {
        axis: "x",
        index: x + 1,
      };
      summary += x + 1;
    }
  }

  // console.log(`\nx axis checks\n`);
  for (let y = 0; y < grid.length - 1; y++) {
    if (isReflective(grid, y, "x")) {
      console.log(`grid ${index} is reflective in the x axis at col: ${y + 1}`);
      reflectionMap[`${index}`] = {
        axis: "y",
        index: y + 1,
      };
      summary += 100 * (y + 1);
    }
  }

  console.log(`Is reflective: ${isReflective(grid, 3, "x")}`);
});

console.log(`Summary: ${summary}`);

function isReflective(puzzle, index, axis) {
  // console.log(`index: ${index}, axis: ${axis}`);

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

      // console.log(`${row1} matches ${row2}`);

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

      // console.log(`${col1.join("")} matches ${col2.join("")}`);

      lower--;
      upper++;
    }
  }

  return true;
}

function getColumn(grid, i) {
  return grid.map((_, index) => grid[index][i]);
}
