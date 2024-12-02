const setup = require("../setup.js");

// setup.createInput("2");
const input: string = setup.getInput("2");
const sizes = input.split("\n");
// console.log(sizes);

let totalArea = 0;

sizes.forEach((size) => {
  const length = size.split("x")[0];
  const width = size.split("x")[1];
  const height = size.split("x")[2];

  const ribbon = calculateRibbon(parseInt(length), parseInt(width), parseInt(height)) + calculateVolume(parseInt(length), parseInt(width), parseInt(height));
  console.log("ribbon: ", ribbon);
  totalArea += ribbon;
});

console.log(totalArea);

function calculateRibbon(length: number, width: number, height: number) {
  const sides = [length, width, height];
  sides.sort((a, b) => a - b);
  console.log(sides);

  console.log("Ribbon", sides[0] * 2 + sides[1] * 2);

  return sides[0] * 2 + sides[1] * 2;
}

function calculateVolume(length: number, width: number, height: number) {
  console.log("Volume", length * width * height);

  return length * width * height;
}

export {};
