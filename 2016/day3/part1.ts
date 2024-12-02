const setup = require("../setup.js");
// setup.createInput("3");
const input: string = setup.getInput("3");
const triangles = input.split("\n");

let triangleAmmount = 0;

for (const triangle of triangles) {
  const sides = triangle
    .split(/\s+/)
    .slice(1)
    .map((l) => parseInt(l));

  if (isTriangle(sides)) {
    triangleAmmount++;
  }
}

console.log(triangleAmmount);

function isTriangle(sides: number[]) {
  let largest = sides[0];
  let largestIndex = 0;

  for (let i = 1; i < 3; i++) {
    if (sides[i] > largest) {
      largest = sides[i];
      largestIndex = i;
    }
  }

  let sumOfSmallest = 0;
  for (let i = 0; i < 3; i++) {
    if (i == largestIndex) continue;

    sumOfSmallest += sides[i];
  }

  // console.log(`${JSON.stringify(sides)} - largeSide: ${largest}, sum of small sides: ${sumOfSmallest}`);
  return largest < sumOfSmallest;
}
