const setup = require("../setup");
let input = setup.getInput("10");

const State = {
  NOOP: "NOOP",
  ADDBEGIN: "ADDBEGIN",
  ADDEND: "ADDEND",
};

let instructions = input.split("\n");

let currentCycle = 0;
let currentInstruction = 0;
let currentState;
let register = 1;
let buffer = 0;
let hasInstructions = true;

let horizontalPos = 0;
let screen = "";

getNextInstruction();

while (true) {
  currentCycle++;
  // Start Cycle

  // During Cycle
  console.log("\nCurrenyCycle: " + currentCycle);
  console.log("Register DURING: " + register);

  if ((currentCycle - 1) % 40 == 0 && currentCycle > 1) screen += "\n";
  if (Math.abs(((currentCycle - 1) % 40) - register) <= 1) {
    screen += "#";
  } else {
    screen += " ";
  }

  // End Cycle
  switch (currentState) {
    case State.ADDEND:
      register += buffer;
      currentInstruction++;
      getNextInstruction();
      break;
    case State.NOOP:
      currentInstruction++;
      getNextInstruction();
      break;
    case State.ADDBEGIN:
      currentState = State.ADDEND;
      break;
  }

  if (!hasInstructions) break;

  if (currentCycle > 250) {
    break;
  }
}

console.log("\n");
console.log(screen);

function getNextInstruction() {
  if (currentInstruction >= instructions.length) {
    hasInstructions = false;
    return;
  }

  let instruction = instructions[currentInstruction];

  if (instruction == "noop") {
    currentState = State.NOOP;
    return;
  }

  instruction = instruction.split(" ");
  currentState = State.ADDBEGIN;
  buffer = parseInt(instruction[1]);
}
