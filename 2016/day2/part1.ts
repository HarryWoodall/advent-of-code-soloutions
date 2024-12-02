import { Vector } from "../../types/common";
import { addVector } from "../../utils/vector";

const setup = require("../setup.js");
// setup.createInput("2");
const input: string = setup.getInput("2");
const lines = input.split("\n");

let currentPos = {
  x: 1,
  y: 1,
};

const keypadMap = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const dirMap = {
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
  L: {
    x: -1,
    y: 0,
  },
  R: {
    x: 1,
    y: 0,
  },
};

let index = 0;

for (const line of lines) {
  // console.log(`\nline`);

  const commands = line.split("");

  for (const command of commands) {
    getNextNumber(command);
    // console.log(getKey(currentPos));
  }

  console.log(getKey(currentPos));
}

function getNextNumber(dir: string) {
  const dirValue = dirMap[dir];
  const newValue = addVector(currentPos, dirValue);

  if (!isValidVector(newValue)) {
    return null;
  }

  currentPos = newValue;
  return getKey(newValue);
}

function getKey(v: Vector) {
  return keypadMap[v.y][v.x];
}

function isValidVector(v: Vector) {
  return v.x > -1 && v.x < 3 && v.y > -1 && v.y < 3;
}
