const setup = require("../setup.js");

const input = setup.getInput(4);
// const input = "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8";

const pairs = input.split("\n");

let fullyContained = 0;

for (let pair of pairs) {
  const pairSet = pair.split(",");

  const first = pairSet[0];
  const firstLower = parseInt(first.split("-")[0]);
  const firstUpper = parseInt(first.split("-")[1]);

  const second = pairSet[1];
  const secondLower = parseInt(second.split("-")[0]);
  const secondUpper = parseInt(second.split("-")[1]);

  if ((firstLower <= secondLower && firstUpper >= secondLower) || (secondLower <= firstLower && secondUpper >= firstLower)) {
    // console.log("Pair: " + pair);
    fullyContained++;
  }
}

console.log(fullyContained);
