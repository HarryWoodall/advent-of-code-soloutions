const fs = require('fs');
let input = fs.readFileSync('Files/day1.txt').toString().split("\r\n");

module.exports = {
  part1: function() {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (i != j) {
          if (parseInt(input[i]) + parseInt(input[j]) == 2020) {
            console.log(parseInt(input[i]) + " + " + parseInt(input[j]) + " =2020");
            console.log(parseInt(input[i]) * parseInt(input[j]));
            return;
          }
        }
      }
    }
  },

  part2: function() {
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input.length; j++) {
        for (let k = 0; k < input.length; k++) {
          if (i != j && i != k && j != k) {
            if (parseInt(input[i]) + parseInt(input[j]) + parseInt(input[k]) == 2020) {
              console.log(parseInt(input[i]) + " + " + parseInt(input[j]) +" + " + parseInt(input[k]) + " =2020");
              console.log(parseInt(input[i]) * parseInt(input[j]) * parseInt(input[k]));
              return;
            }
          }
        }   
      }
    }
  }
}