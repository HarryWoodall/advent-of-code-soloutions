const setup = require("../setup");
let input = setup.getInput("10");

const State = {
  NOOP: "NOOP",
  ADDBEGIN: "ADDBEGIN",
  ADDEND: "ADDEND",
};

let instructions = input.split("\n");
// let instructions = ["noop", "addx 3", "addx -5"];

let currentCycle = 0;
let currentInstruction = 0;
let currentState;
let register = 1;
let buffer = 0;
let hasInstructions = true;

let signalSum = 0;

getNextInstruction();

while (true) {
  currentCycle++;
  // console.log("\nCycle: " + currentCycle);

  // Start Cycle
  // console.log("Current Instruction: " + currentState);

  //check register
  if ((currentCycle + 20) % 40 == 0) {
    console.log("\nCurrenyCycle: " + currentCycle);
    console.log("Register DURING: " + register);
    console.log("Signal Strength: " + currentCycle * register);
    signalSum += currentCycle * register;
  }

  // console.log("Register DURING: " + register);

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

  // console.log("Register AFTER: " + register);

  if (!hasInstructions) break;

  if (currentCycle > 250) {
    break;
  }
}

console.log("\nSignal Sum: " + signalSum);

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
