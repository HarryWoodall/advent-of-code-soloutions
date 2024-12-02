const setup = require("../setup.js");
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
const tilesVisited: Vector[] = [];

let currentDirecton = 0;
let orientations = ["N", "E", "S", "W"];

const items = input.split(", ");

locations.push({ ...currentPos });

var tileFound = false;

for (const item of items) {
  const dir = item[0];
  const dist = parseInt(item.slice(1));

  changeDirection(dir);
  move(dist);

  // let locationMatch = false;
  // console.log(`Location ammount: ${locations.length}`);
  // for (const location of locations) {
  //   if (matchVector(currentPos, location)) {
  //     locationMatch = true;
  //     break;
  //   }
  // }

  if (tileFound) break;
  // if (locationMatch) break;

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
  const seenBefore = visitTiles(distance);

  if (seenBefore) {
    console.log("TILE VISITED BEFORE");
    console.log(seenBefore);
    console.log(Math.abs((seenBefore as Vector).x) + Math.abs((seenBefore as Vector).y));
    console.log("");
  }

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

function visitTiles(distance: number): Vector | boolean {
  for (let i = 1; i <= distance; i++) {
    const newVector = { ...currentPos };

    switch (orientations[currentDirecton]) {
      case "N":
        newVector.y += i;
        break;
      case "E":
        newVector.x += i;
        break;
      case "S":
        newVector.y -= i;
        break;
      case "W":
        newVector.x -= i;
        break;
    }

    if (tilesVisited.some((v) => matchVector(v, newVector))) {
      tileFound = true;
      return newVector;
    }

    tilesVisited.push(newVector);
  }
  return false;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function matchVector(l1: Vector, l2: Vector) {
  return l1.x == l2.x && l1.y == l2.y;
}
