const setup = require("../setup.js");


setup.createInput(1);
const input = setup.getInput(1);

let elves = input.split("\n\n");
let highestCal = 0;

for (elve of elves) {
  let total = 0;
  items = elve.split("\n");

  for (item of items) {
    total += parseInt(item);
  }

  if (total > highestCal)
    highestCal = total;
}

console.log("Highest cal: " +  highestCal);