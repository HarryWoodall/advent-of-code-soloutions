import { Vector } from "../../types/common";
import { addVector } from "../../utils/vector";

const setup = require("../setup.js");
// setup.createInput("2");
const input: string = setup.getInput("2");
const lines = input.split("\n");

let currentPos = {
  x: 0,
  y: 2,
};

const keypadMap = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, "A", "B", "C", null],
  [null, null, "D", null, null],
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

let index = 1;

for (const line of lines) {
  const commands = line.split("");

  for (const command of commands) {
    var oldPos = { ...currentPos };
    getNextNumber(command);
    // console.log(`Line: ${index}, command: ${command}, oldKey: ${getKey(oldPos)}, newKey: ${getKey(currentPos)}`);
  }

  console.log(getKey(currentPos));
  index++;
}

function getNextNumber(dir: string) {
  const dirValue = dirMap[dir];
  const newValue = addVector(currentPos, dirValue);

  if (!isValidVector(newValue)) {
    // console.log(`Invalid vector: ${JSON.stringify(newValue)} from ${JSON.stringify(currentPos)}`);
    return null;
  }

  currentPos = newValue;
  return getKey(newValue);
}

function getKey(v: Vector) {
  return keypadMap[v.y][v.x];
}

function isValidVector(v: Vector) {
  return v.x > -1 && v.y > -1 && v.x < 5 && v.y < 5 && getKey(v) != null;
}
