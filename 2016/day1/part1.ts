const setup = require("../setup.js");
// setup.createInput("1");
const input: string = setup.getInput("1");

const testString = "R8, R4, R4, R8";

type Vector = {
  x: number;
  y: number;
};

const currentPos: Vector = {
  x: 0,
  y: 0,
};

const locations: Vector[] = [];

let currentDirecton = 0;
let orientations = ["N", "E", "S", "W"];

const items = testString.split(", ");

locations.push({ ...currentPos });

for (const item of items) {
  const dir = item[0];
  const dist = parseInt(item.slice(1));

  changeDirection(dir);
  move(dist);

  let locationMatch = false;
  console.log(`Location ammount: ${locations.length}`);
  for (const location of locations) {
    if (matchVector(currentPos, location)) {
      locationMatch = true;
      break;
    }
  }

  if (locationMatch) break;

  locations.push({ ...currentPos });
}

console.log(currentPos);
console.log(`distance: ${Math.abs(currentPos.y + currentPos.x)}`);

function changeDirection(direction: string) {
  switch (direction) {
    case "L":
      currentDirecton = mod(currentDirecton - 1, 4);
      break;
    case "R":
      currentDirecton = mod(currentDirecton + 1, 4);
      break;
  }
}

function move(distance: number) {
  switch (orientations[currentDirecton]) {
    case "N":
      currentPos.y += distance;
      break;
    case "E":
      currentPos.x += distance;
      break;
    case "S":
      currentPos.y -= distance;
      break;
    case "W":
      currentPos.x -= distance;
      break;
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function matchVector(l1: Vector, l2: Vector) {
  return l1.x == l2.x && l1.y == l2.y;
}
