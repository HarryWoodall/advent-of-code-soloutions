const setup = require("../setup.js");

const input = setup.getInput(5);
const lines = input.split("\n");

let stacks = [[], [], [], [], [], [], [], [], []];

for (let i = 0; i < 9; i++) {
  const line = lines[i];
  let currentStack = 0;

  for (let j = 0; j < line.length; j += 4) {
    if (line[j + 1] != " ") {
      stacks[currentStack].push(line[j + 1]);
    }
    currentStack++;
  }
}

for (let i = 0; i < stacks.length; i++) {
  stacks[i] = stacks[i].reverse();
}

for (let i = 10; i < lines.length; i++) {
  const line = lines[i];
  const commands = line.split(" ");
  const ammount = parseInt(commands[1]);
  const from = parseInt(commands[3]);
  const to = parseInt(commands[5]);

  for (let j = 0; j < ammount; j++) {
    const temp = stacks[from - 1].pop();
    stacks[to - 1].push(temp);
  }
}

console.log(stacks);
