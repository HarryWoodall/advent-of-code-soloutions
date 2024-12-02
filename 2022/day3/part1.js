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
for (backpack of backpacks) {
  let firstHalf = backpack.slice(0, backpack.length / 2);
  let secondHalf = backpack.slice(backpack.length / 2);

  let commonElements = new Set(firstHalf.split("").filter((value) => secondHalf.split("").includes(value)));

  for (const item of commonElements) {
    if (item == item.toUpperCase()) priority += item.charCodeAt(0) - 38;
    else priority += item.charCodeAt(0) - 96;
  }
}

console.log(priority);
