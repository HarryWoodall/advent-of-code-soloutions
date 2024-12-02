const setup = require("../setup.js");

setup.createInput("12");
const input = setup.getInput("12");
const lines = input.split("\n");

// console.log(isValid("..#...#...###.".split(""), [1, 1, 3]));
const validArrangements = [];

lines.forEach((line, index) => {
  // if (index != 0) return;

  const puzzle = line.split(" ")[0];

  const target = line
    .split(" ")[1]
    .split(",")
    .map((item) => parseInt(item));

  const unknownIndexes = [];

  puzzle.split("").forEach((item, index) => {
    if (item == "?") unknownIndexes.push(index);
  });

  const maxIterations = Math.pow(2, unknownIndexes.length);
  let validArrangement = 0;

  for (let i = 0; i < maxIterations; i++) {
    const charArray = generateArray(i, unknownIndexes.length);
    const output = [...puzzle];

    charArray.forEach((char, index) => {
      output[unknownIndexes[index]] = char;
    });

    // console.log(output.join(""), isValid(output, target));

    if (isValid(output, target)) validArrangement++;
  }

  console.log(validArrangement);
  validArrangements.push(validArrangement);
});

console.log(`Sum: ${validArrangements.reduce((acc, a) => acc + a, 0)}`);

function isValid(string, target) {
  stringArray = string;

  let currentTargetIndex = 0;
  let isSpring = false;
  let currentSpringLength = 0;

  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i] == ".") {
      if (isSpring) {
        if (target[currentTargetIndex] != currentSpringLength) return false;
        currentTargetIndex++;
      }

      isSpring = false;
      currentSpringLength = 0;
    }

    if (stringArray[i] == "#") {
      isSpring = true;
      currentSpringLength++;
    }
  }

  if (currentTargetIndex == target.length - 1 && isSpring && currentSpringLength == target[currentTargetIndex]) return true;
  if (currentTargetIndex - 1 == target.length - 1 && !isSpring) return true;

  return false;
}

function dec2bin(dec, base) {
  const binary = (dec >>> 0).toString(2);
  return Array(base).fill(0).join("").substring(binary.length) + binary;
}

function generateArray(number, base) {
  const binaryArray = dec2bin(number, base).split("");
  const result = [];

  for (let i = 0; i < binaryArray.length; i++) {
    if (binaryArray[i] == 0) result.push(".");
    if (binaryArray[i] == 1) result.push("#");
  }

  return result;
}
