const setup = require("../setup.js");
// setup.createInput("3");
const input: string = setup.getInput("3");
const triangles = input.split("\n");

let triangleAmmount = 0;
const mappedTriangles = [];

for (let i = 0; i < triangles.length; i += 3) {
  const row1 = triangles[i]
    .split(/\s+/)
    .slice(1)
    .map((l) => parseInt(l));

  const row2 = triangles[i + 1]
    .split(/\s+/)
    .slice(1)
    .map((l) => parseInt(l));

  const row3 = triangles[i + 2]
    .split(/\s+/)
    .slice(1)
    .map((l) => parseInt(l));

  const tri1 = [row1[0], row2[0], row3[0]];
  const tri2 = [row1[1], row2[1], row3[1]];
  const tri3 = [row1[2], row2[2], row3[2]];

  mappedTriangles.push(tri1, tri2, tri3);
}

console.log(mappedTriangles);

for (const triangle of mappedTriangles) {
  if (isTriangle(triangle)) {
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
