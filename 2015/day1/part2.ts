const setup = require("../setup.js");

setup.createInput("1");
const input: string = setup.getInput("1");

let currentHeight = 0;
let firstToBasement = -1;

input.split("").forEach((item, index) => {
  if (currentHeight < 0 && firstToBasement < 0) {
    firstToBasement = index;
  }

  currentHeight += item == "(" ? 1 : -1;
});

console.log(firstToBasement);

export {};
