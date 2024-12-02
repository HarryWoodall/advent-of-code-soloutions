const fs = require("fs");

let input = fs.readFileSync("Files/day1.txt").toString().split("\n");
input = input.map((item) => parseInt(item));

module.exports = {
  part1: function () {
    let ascending = 0;
    for (let i = 1; i < input.length; i++) {
      if (input[i] > input[i - 1]) ascending++;
    }

    console.log(ascending);
  },

  part2: function () {
    let ascending = 0;
    let previousSum = Infinity;

    for (let i = 2; i < input.length; i++) {
      let currentSum = input[i] + input[i - 1] + input[i - 2];
      if (currentSum > previousSum) ascending++;
      previousSum = currentSum;
    }

    console.log(ascending);
  },
};
