const setup = require("../setup");
let input = setup.getInput(9);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  isAjacent(vector) {
    const deltaX = Math.abs(this.x - vector.x);
    const deltaY = Math.abs(this.y - vector.y);

    return deltaX <= 1 && deltaY <= 1;
  }

  direction(vector) {
    return new Vector(Math.max(Math.min(vector.x - this.x, 1), -1), Math.max(Math.min(vector.y - this.y, 1), -1));
  }
}

const commands = input.split("\n");
const testCommands = ["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"];

let ropePositions = [
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
  new Vector(0, 0),
];

let positions = new Set();
positions.add(JSON.stringify(new Vector(0, 0)));

for (let command of commands) {
  executeCommand(command);
}

console.log(positions.size);

function executeCommand(command) {
  let direction = command.split(" ")[0];
  let ammount = command.split(" ")[1];

  // console.log("\nCOMMAND: " + command);

  for (let i = 0; i < parseInt(ammount); i++) {
    switch (direction) {
      case "L":
        // console.log("HEAD moves Left 1");
        ropePositions[0].x--;
        break;
      case "R":
        // console.log("HEAD moves Right 1");
        ropePositions[0].x++;
        break;
      case "U":
        ropePositions[0].y++;
        // console.log("HEAD moves Up 1");
        break;
      case "D":
        ropePositions[0].y--;
        // console.log("HEAD moves Down 1");
        break;
    }

    for (let i = 1; i < ropePositions.length; i++) {
      calculateTailPosition(i);
    }
  }
}

function calculateTailPosition(index) {
  if (ropePositions[index - 1].isAjacent(ropePositions[index])) {
    // console.log("TAIL stays same position");
    return;
  }

  // console.log(`TAIL moves (${currentTailPosition.direction(currentHeadPosition).x}, ${currentTailPosition.direction(currentHeadPosition).y})`);
  ropePositions[index].add(ropePositions[index].direction(ropePositions[index - 1]));

  if (index == ropePositions.length - 1) positions.add(JSON.stringify(ropePositions[index]));
}
