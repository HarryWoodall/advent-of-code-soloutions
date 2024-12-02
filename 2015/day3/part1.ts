const setup = require("../setup.js");

// setup.createInput("3");
const input: string = setup.getInput("3");
const actions = input.split("");
const ords = new Set<string>();
ords.add("0,0");
const currentLocation = {
  x: 0,
  y: 0,
};

actions.forEach((ord) => {
  switch (ord) {
    case "^":
      currentLocation.y -= 1;
      break;
    case "v":
      currentLocation.y += 1;
      break;
    case ">":
      currentLocation.x += 1;
      break;
    case "<":
      currentLocation.x -= 1;
      break;
  }

  ords.add(`${currentLocation.x},${currentLocation.y}`);
});

console.log(`houses visited: ${ords.size}`);
// console.log(ords);

export {};
