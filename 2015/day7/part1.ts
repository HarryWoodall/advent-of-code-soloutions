const setup = require("../setup.js");

const NOT = "NOT";
const AND = "AND";
const OR = "OR";
const LSHIFT = "LSHIFT";
const RSHIFT = "RSHIFT";

const operatorArray = [NOT, AND, OR, LSHIFT, RSHIFT];

class Command {
  lhs: string | number;
  rhs: string;
  operator: string | undefined;
  primaryOperator: string | number | undefined;
  secondaryOperator: string | number | undefined;

  constructor(commandString: string) {
    this.lhs = commandString.split(" -> ")[0];
    this.rhs = commandString.split(" -> ")[1];

    if (!isNaN(Number(this.lhs))) this.lhs = Number(this.lhs);

    this.operator = operatorArray.find((operator) => typeof this.lhs == "string" && this.lhs.includes(operator));

    if (!this.operator) return;
    if (typeof this.lhs == "number") return;

    switch (this.operator) {
      case AND:
      case OR:
      case LSHIFT:
      case RSHIFT:
        this.primaryOperator = this.lhs.split(" ")[0];
        this.secondaryOperator = this.lhs.split(" ")[2];

        if (!isNaN(Number(this.primaryOperator))) this.primaryOperator = Number(this.primaryOperator);
        if (!isNaN(Number(this.secondaryOperator))) this.secondaryOperator = Number(this.secondaryOperator);

        break;
      case NOT:
        this.primaryOperator = this.lhs.split(" ")[1];
    }
  }
}

type KnownValue = {
  name: string;
  value: number;
};

// setup.createInput("7");
const input: string = setup.getInput("7");
const commands: Command[] = input.split("\n").map((str) => new Command(str));
commands.sort((a, b) => {
  if (a.rhs < b.rhs) {
    return -1;
  }
  if (a.rhs > b.rhs) {
    return 1;
  }
  return 0;
});
const knownValues: KnownValue[] = [];

// console.log(commands);

let solvedOperationsCount = commands.filter((command) => !command.operator).length;
let unsolvedOperations = commands.filter((command) => command.operator);

commands
  .filter((command) => !command.operator)
  .forEach((op) => {
    if (typeof op.lhs == "number") {
      knownValues.push({
        name: op.rhs,
        value: op.lhs,
      });
    }
  });

let itterationCount = 0;

while (knownValues.length < commands.length && itterationCount < 1000) {
  [...unsolvedOperations].forEach((op) => {
    const unknownOperators = [];
    if (typeof op.primaryOperator == "string") unknownOperators.push(op.primaryOperator);
    if (typeof op.secondaryOperator == "string") unknownOperators.push(op.secondaryOperator);

    let isSolvable = true;
    // if (op.secondaryOperator == "r") {
    //   console.log(op, unknownOperators);
    // }

    unknownOperators.forEach((unknownOp) => {
      const opValue = knownValues.filter((knowns) => knowns.name == unknownOp)[0];

      if (!opValue) isSolvable = false;
    });

    if (isSolvable) {
      const variableValue = solveOperation(op);

      if (!knownValues.filter((value) => value.name == op.rhs).length) {
        knownValues.push({
          name: op.rhs,
          value: variableValue,
        });

        const index = unsolvedOperations.findIndex((unsolvedOp) => unsolvedOp.lhs == op.lhs && unsolvedOp.rhs == op.rhs);
        unknownOperators.splice(index, 1);

        solvedOperationsCount++;
      }
    }
  });

  itterationCount++;
}

console.log(itterationCount);
console.log(knownValues);
knownValues.sort((a, b) => {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
});
console.log(knownValues);
console.log(knownValues.filter((v) => v.name == "lx")[0].value);

function solveOperation(command: Command) {
  if (typeof command.primaryOperator == "string") command.primaryOperator = knownValues.filter((value) => value.name == command.primaryOperator)[0].value;
  if (typeof command.secondaryOperator == "string") command.secondaryOperator = knownValues.filter((value) => value.name == command.secondaryOperator)[0].value;

  switch (command.operator) {
    case NOT:
      return uint16(~command.primaryOperator);
    case AND:
      return command.primaryOperator & command.secondaryOperator;
    case OR:
      return command.primaryOperator | command.secondaryOperator;
    case LSHIFT:
      return uint16(command.primaryOperator << command.secondaryOperator);
    case RSHIFT:
      return uint16(command.primaryOperator >> command.secondaryOperator);
  }
}

function uint16(n) {
  return n & 0xffff;
}

export {};
