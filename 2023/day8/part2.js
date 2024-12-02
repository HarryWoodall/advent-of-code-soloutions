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

nodes.forEach((node) => {
  const leftIndex = nodes.map((n) => n.name).indexOf(node.left);
  const rightIndex = nodes.map((n) => n.name).indexOf(node.right);

  node.left = { value: node.left, index: leftIndex };
  node.right = { value: node.right, index: rightIndex };
});

// console.log("starting nodes: ");
// console.log(currentNodes);

let currentNodes = nodes.filter((item) => item.name.match(/..A/));
let modes = [];

for (let i = 0; i < currentNodes.length; i++) {
  nodes.filter((item) => item.name.match(/..A/));
  let currentIteration = 0;

  const currentNodeIndex = i;
  const currentNodeSuccessItteration = [];

  while (currentIteration < 1000000) {
    if (hasEnded([currentNodes[currentNodeIndex]])) {
      // console.log(currentIteration);
      currentNodeSuccessItteration.push(currentIteration);
      // return;
    }

    const nextNodes = [];
    [currentNodes[currentNodeIndex]].forEach((node) => {
      instructions[currentIteration % instructions.length] == "L" ? nextNodes.push(node.left) : nextNodes.push(node.right);
    });

    [currentNodes[currentNodeIndex]] = nextNodes.map((node) => nodes[node.index]);
    currentIteration++;
  }

  console.log(currentIteration);
  // console.log(
  //   currentNodeSuccessItteration.forEach((item, index) => {
  //     if (index == 0) return;

  //     console.log(item - currentNodeSuccessItteration[index - 1]);
  //   })
  // );

  console.log("Mode: ", mode(currentNodeSuccessItteration));
  modes.push(mode(currentNodeSuccessItteration));
}

console.log(leastCommonMultiple(modes).toPrecision(26));

function hasEnded(currentNodes) {
  let hasEnded = true;
  const nodeMatches = [];

  currentNodes.forEach((node) => {
    if (!node.name.match(/..Z/)) hasEnded = false;
    else nodeMatches.push(node);
  });

  if (nodeMatches.length > 2) {
    console.log("current Iteration", currentIteration);
    console.log(nodeMatches);
  }

  return hasEnded;
}

function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

function leastCommonMultiple(arr) {
  arr = arr.sort();
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  var multiple = arr[0];
  arr.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}
