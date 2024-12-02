const setup = require("../setup.js");


setup.createInput(1);
const input = setup.getInput(1);

class Elf {
  snacks = [];
  totalCalories = 0;

  calculateTotalCalories = function () {
    for (let snack of this.snacks) {
      this.totalCalories += parseInt(snack);
    }
  }
}

const elfArray = [];

let elfInput = input.split("\n\n");

for (elfValues of elfInput) {
  let elf = new Elf();
  elf.snacks = elfValues.split("\n");
  elf.calculateTotalCalories();

  elfArray.push(elf);
}

let sortedArray = elfArray.sort((a, b) => (a.totalCalories < b.totalCalories) ? 1 : -1);

let compeleteCalories = sortedArray[1].totalCalories + sortedArray[2].totalCalories + sortedArray[3].totalCalories

console.log(sortedArray[1]);
console.log(sortedArray[2]);
console.log(sortedArray[3]);
console.log(compeleteCalories);