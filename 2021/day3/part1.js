const fs = require("fs");
const setup = require("../setup");

let input = setup.getInput(3);

let rows = input.split("\n");

let significantBits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (row of rows) {
  for (let i = 0; i < row.length; i++) {
    if (row[i] == 1) significantBits[i]++;
  }
}

const sigBit = significantBits.map((_) => (_ > 500 ? 1 : 0));
const leastSigBit = significantBits.map((_) => (_ > 500 ? 0 : 1));

first = parseInt(sigBit.join(""), 2);
second = parseInt(leastSigBit.join(""), 2);

console.log(first * second);
