const setup = require("../setup.js");

setup.createInput("6");
const input = setup.getInput("6");

const lines = input.split("\n");
const time = parseInt(lines[0].split(/:\s+/)[1].split(/\s+/).join(""));
const distance = parseInt(lines[1].split(/:\s+/)[1].split(/\s+/).join(""));

console.log(time);
console.log(distance);

const differentWays = [];

correctTimes = [];

for (let i = 1; i < time - 1; i++) {
  const d = i * (time - i);
  if (d > distance) correctTimes.push(i);
}

console.log(correctTimes.length);
differentWays.push(correctTimes.length);
