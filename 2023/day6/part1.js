const setup = require("../setup.js");

setup.createInput("6");
const input = setup.getInput("6");

const lines = input.split("\n");
const times = lines[0]
  .split(/:\s+/)[1]
  .split(/\s+/)
  .map((time) => parseInt(time));
const distances = lines[1]
  .split(/:\s+/)[1]
  .split(/\s+/)
  .map((time) => parseInt(time));

// console.log(times);
// console.log(distances);

const differentWays = [];

times.forEach((time, index) => {
  correctTimes = [];
  for (let i = 1; i < time - 1; i++) {
    const distance = i * (time - i);
    if (distance > distances[index]) correctTimes.push(i);
  }
  console.log(correctTimes);
  differentWays.push(correctTimes.length);
});

console.log(`Sum: ${differentWays.reduce((acc, a) => acc * a, 1)}`);
