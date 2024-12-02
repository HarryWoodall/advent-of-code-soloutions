const setup = require("../setup.js");

// setup.createInput("3");
const input: string = setup.getInput("3");
const actions = input.split("");
const ords = new Set<string>();
ords.add("0,0");
const santaLocation = {
  x: 0,
  y: 0,
};

const robotLocation = {
  x: 0,
  y: 0,
};

actions.forEach((ord, index) => {
  if (index % 2 == 0) {
    switch (ord) {
      case "^":
        santaLocation.y -= 1;
        break;
      case "v":
        santaLocation.y += 1;
        break;
      case ">":
        santaLocation.x += 1;
        break;
      case "<":
        santaLocation.x -= 1;
        break;
    }
    ords.add(`${santaLocation.x},${santaLocation.y}`);
  } else {
    switch (ord) {
      case "^":
        robotLocation.y -= 1;
        break;
      case "v":
        robotLocation.y += 1;
        break;
      case ">":
        robotLocation.x += 1;
        break;
      case "<":
        robotLocation.x -= 1;
        break;
    }

    ords.add(`${robotLocation.x},${robotLocation.y}`);
  }
});

console.log(`houses visited: ${ords.size}`);
// console.log(ords);

export {};
