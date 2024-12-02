const fs = require("fs");

let input = fs.readFileSync("Files/day2.txt").toString().split("\n");

module.exports = {
  part1: function () {
    let horizontalPos = 0;
    let depthPos = 0;
    for (let i = 0; i < input.length; i++) {
      commandArray = input[i].split(" ");

      switch (commandArray[0]) {
        case "forward":
          horizontalPos += parseInt(commandArray[1]);
          break;
        case "up":
          depthPos -= parseInt(commandArray[1]);
          break;
        case "down":
          depthPos += parseInt(commandArray[1]);
          break;
      }
    }

    console.log(horizontalPos * depthPos);
  },

  part2: function () {
    let horizontalPos = 0;
    let depthPos = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
      commandArray = input[i].split(" ");

      switch (commandArray[0]) {
        case "forward":
          horizontalPos += parseInt(commandArray[1]);
          depthPos += aim * parseInt(commandArray[1]);
          break;
        case "up":
          aim -= parseInt(commandArray[1]);
          break;
        case "down":
          aim += parseInt(commandArray[1]);
          break;
      }
    }

    console.log(horizontalPos * depthPos);
  },
};
