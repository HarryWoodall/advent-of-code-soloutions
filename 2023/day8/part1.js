const setup = require("../setup.js");

setup.createInput("8");
const input = setup.getInput("8");
const lines = input.split("\n");

const instructions = lines[0].split("");
const nodes = [];

for (let i = 2; i < lines.length; i++) {
  const name = lines[i].split(" = ")[0];
  const directions = lines[i].split(" = ")[1];

  const left = directions.split(", ")[0].replace("(", "");
  const right = directions.split(", ")[1].replace(")", "");

  nodes.push({
    name: name,
    left: left,
    right: right,
  });
}

let isFound = false;
let currentNode = nodes.find((item) => item.name == "AAA");
let currentIteration = 0;

while (currentIteration < 1000000) {
  if (currentNode.name == "ZZZ") {
    console.log(currentIteration);
    return;
  }

  const nextNode = instructions[currentIteration % instructions.length] == "L" ? currentNode.left : currentNode.right;
  currentNode = nodes.find((item) => item.name == nextNode);
  currentIteration++;
}
