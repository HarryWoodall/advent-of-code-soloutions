import { Command, TernaryItem } from "./types";

const setup = require("../setup.js");
const input: string = setup.getInput("8-test");
const rawCommands = input.split("\n");

let commands: Command[] = [];

for (const raw of rawCommands) {
  commands.push(commandFactory(raw));
}

console.log(commands);

export function getCommands() {
  commands = [];
  for (const raw of rawCommands) {
    commands.push(commandFactory(raw));
  }

  return commands;
}

function commandFactory(command: string): Command {
  const tokens = command.split(" ");

  switch (tokens[0]) {
    case "rect":
      return {
        type: "RECT",
        valueA: parseInt(tokens[1][0]),
        valueB: parseInt(tokens[1][2]),
      };
    case "rotate":
      return {
        type: "ROTATE",
        ternary: tokens[1].toUpperCase() as TernaryItem,
        valueA: parseInt(tokens[2][2]),
        valueB: parseInt(tokens[4]),
      };
  }
}
