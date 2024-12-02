const fs = require('fs');
let input = fs.readFileSync('Files/day9.txt').toString().split("\r\n");

const target = 138879426;
let currentSum = 0;
let numbers = [];
let startIndex = 0;
let currentIndex = 0;

module.exports = {
  part1: function() {
    for (let i = 25; i < input.length; i++) {
      if (!checkValidity(i)) {
        console.log(`Number ${input[i]} is not valid`);
        return;
      }
    }
  },

  part2: function() {
    while(true) {
      if (currentSum == target) {
        console.log("Target Number found");
        console.log(`Weakness = ${Math.min(...numbers) + Math.max(...numbers)}`);
        return;
      } else if (currentSum > target) {
        currentSum = 0;
        numbers = [];
        startIndex++;
        currentIndex = startIndex;
      } else {
        addNumbers();
      }
    }
  }
}

function checkValidity(index) {
  let value = parseInt(input[index]);
  for (let i = index - 25; i < index; i++) {
    for (let j = index - 25; j < index; j++) {
      if (i != j) {
        let first = parseInt(input[i]);
        let second = parseInt(input[j]);
        if (first + second == value) {
          return true;
        }
      }
    }
  }
  return false;
}

function addNumbers() {
  currentNumber = parseInt(input[currentIndex]);
  currentSum += currentNumber;
  currentIndex++;
  numbers.push(currentNumber);
}