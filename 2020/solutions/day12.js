const fs = require('fs');
let input = fs.readFileSync('Files/day12.txt').toString().split("\r\n");
let testInput = fs.readFileSync('Files/day12Test.txt').toString().split("\r\n");

const direction = ["E", "S", "W", "N"];

const currentLocation = [0, 0];
let currentWaypoint = [10, 1];
let currentDirection = 4000;

module.exports = {
  part1: function() {

    for (let i = 0; i < input.length; i++) {
      const action = input[i].substr(0, 1);
      const value = input[i].substr(1);
      performAction(action, value);
      console.log(`Action: ${action}, Value: ${value}, New Position: ${currentLocation}, New Direction ${direction[currentDirection % 4]}`);
    }

    console.log(Math.abs(currentLocation[0]) + Math.abs(currentLocation [1]));
  },

  part2: function() {

    for (let i = 0; i < input.length; i++) {
      const action = input[i].substr(0, 1);
      const value = input[i].substr(1);
      performActionTwo(action, value);
      console.log(`Action: ${action}, Value: ${value}, New Position: ${currentLocation}, New Direction ${direction[currentDirection % 4]}`);
    }

    console.log(Math.abs(currentLocation[0]) + Math.abs(currentLocation [1]));
  }
}

function performAction(action, value) {
  switch(action) {
    case "N":
      currentLocation[1] += parseInt(value);
      break;
    case "S":
      currentLocation[1] -= parseInt(value);
      break;
    case "E":
      currentLocation[0] += parseInt(value);
      break;
    case "W":
      currentLocation[0] -= parseInt(value);
      break;
    case "L":
      currentDirection -= (value/90) % 4;
      break;
    case "R":
      currentDirection += (value/90) % 4;
      break;
    case "F":
      performAction(direction[Math.abs(currentDirection % 4)], value);
      break;
    default: 
      console.log(`SOMETHING WENT WRONG: TRIED TO PERFORM: ${action}`);
  }
}

function performActionTwo(action, value) {
  value = parseInt(value);
  switch(action) {
    case "N":
      currentWaypoint[1] += parseInt(value);
      break;
    case "S":
      currentWaypoint[1] -= parseInt(value);
      break;
    case "E":
      currentWaypoint[0] += parseInt(value);
      break;
    case "W":
      currentWaypoint[0] -= parseInt(value);
      break;
    case "L":
      currentWaypoint = rotate(currentWaypoint, value);
      break;
    case "R":
      currentWaypoint = rotate(currentWaypoint, -value);
      break;
    case "F":
      currentLocation[0] +=  currentWaypoint[0] * value;
      currentLocation[1] +=  currentWaypoint[1] * value;
      break;
    default: 
      console.log(`SOMETHING WENT WRONG: TRIED TO PERFORM: ${action}`);
  }
}

function rotate(currentPosition, value) {
  switch(value) {
    case 90:
    case -270:
      return [-currentPosition[1], currentPosition[0]];
    case 180:
    case -180:
      return [-currentPosition[0], -currentPosition[1]];
    case 270:
    case -90:
      return [currentPosition[1], -currentPosition[0]];
    case 360:
      return currentPosition;
    default:
      console.log(`SOMETHING WENT WRONG TRYING TO PROCESS ${value}`);
  }
}