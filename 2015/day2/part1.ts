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

  const area = calculateArea(parseInt(length), parseInt(width), parseInt(height));
  // console.log("area: ", area);
  totalArea += area;
});

console.log(totalArea);

function calculateArea(length: number, width: number, height: number) {
  const sides = [length * width, width * height, height * length];
  const area = 2 * length * width + 2 * width * height + 2 * height * length;

  return area + sides.sort((a, b) => a - b)[0];
}

export {};
