const setup = require("../setup.js");

setup.createInput("9");
const input = setup.getInput("9");
const lines = input.split("\n").map((item) => item.split(" ").map((number) => parseInt(number)));

const nextNumbers = [];

lines.forEach((line) => {
  const nextNumber = calculateNextNumber(line, 0);
  console.log(nextNumber);
  nextNumbers.push(nextNumber);
});

console.log(`Sum: ${nextNumbers.reduce((acc, a) => acc + a, 0)}`);

function calculateNextNumber(numbers, depth) {
  const differences = getDifferences(numbers);

  if (depth > 100) return;

  if (numbers[0] == 0 && new Set(numbers).size == 1) {
    return 0;
  }

  numbers.push(numbers.at(-1) + calculateNextNumber(differences, depth + 1));

  return numbers.at(-1);
}

function getDifferences(numbers) {
  const differences = [];

  numbers.forEach((number, index) => {
    if (index == numbers.length - 1) return;

    differences.push(numbers[index + 1] - number);
  });

  return differences;
}
