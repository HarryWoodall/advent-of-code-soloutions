const fs = require('fs');
let input = fs.readFileSync('Files/day10.txt').toString().split("\r\n").map(Number);

input.push(0);
input.sort((a, b) => {
  return a - b;
});
input.push(input[input.length - 1] + 3);

module.exports = {
  part1: function() {
    console.log(...input);

    let oneJoltDiff = 0;
    let threeJoltDiff = 0;

    
    for (let i = 0; i < input.length; i++) {
      if (i > 0) {
        if (input[i] - input[i - 1] == 1) {
          oneJoltDiff++;
        } else if (input[i] - input[i-1] == 3) {
          threeJoltDiff++;
        }
      }
    }

    console.log(oneJoltDiff * threeJoltDiff);
  },

  part2: function() {
    result = 0;
    for (let i = 1; i < input.length; i++) {
      if (result == 0) {
        result = getDiff(i);
      } else {
        result *= getDiff(i);
      }
      console.log(getDiff(i))
    }
    console.log(result);
  }
}

function getDiff(index) {
  items = 0;
  range = 0;
  for (let i = index; i < index + 3; i++) {
    range += input[i] - input[i - 1];
    if (range <= 3) {
      items++;
    } else {
      break;
    }
  }

  switch (items) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3: 
      return 6;
  }
}

