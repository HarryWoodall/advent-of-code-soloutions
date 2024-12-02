const setup = require("../setup.js");

input = setup.getInput(3);

backpacks = input.split("\n");

testInput = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

let priority = 0;
for (let i = 0; i < backpacks.length; i += 3) {
  let first = backpacks[i];
  let second = backpacks[i + 1];
  let third = backpacks[i + 2];

  let commonElements = new Set(
    first
      .split("")
      .filter((value) => second.split("").includes(value))
      .filter((value) => third.split("").includes(value))
  );

  for (const item of commonElements) {
    if (item == item.toUpperCase()) priority += item.charCodeAt(0) - 38;
    else priority += item.charCodeAt(0) - 96;
  }
}

console.log(priority);
