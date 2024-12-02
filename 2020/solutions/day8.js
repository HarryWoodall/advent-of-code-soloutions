const fs = require('fs');
let input = fs.readFileSync('Files/day8.txt').toString().split("\r\n");

let acc = 0;
let currentOperation = 0;
let opList = [];
let changeList = [];
let hasChanged = false;

module.exports = {
  part1: function() {

    while(true) {
      if (currentOperation < 0) {
        console.log(`Current op ${currentOperation}: Accumumator:" ${acc}`);
        currentOperation = 0;
        hasChanged = false;
        opList = [];
        acc = 0;
        continue;
      } else if (currentOperation < input.length) {
        elements = input[currentOperation].split(" ");
      } else {
        console.log(`Program termimates normally, Accumulator: ${acc}`);
        return;
      }

      operation = elements[0];
      ammount = parseInt(elements[1]);

      if (opList.includes(currentOperation)) {
        console.log("Loop detected: Accumumator:", acc);
        currentOperation = 0;
        hasChanged = false;
        opList = [];
        acc = 0;
      }

      switch(operation) {
        case "nop":
          noOp();
          break;
        case "acc":
          accumulate(ammount);
          break;
        case "jmp":
          jump(ammount);
          break;
      }
    }

  }
}

function accumulate(input) {
  acc += input;
  opList.push(currentOperation);
  currentOperation++;
}

function jump(input) {
  if (!changeList.includes(currentOperation) && !hasChanged) {
    changeList.push(currentOperation);
    noOp();
    hasChanged = true;
  } else {
    opList.push(currentOperation);
    currentOperation += input;
  }
}

function noOp() {
  opList.push(currentOperation);
  currentOperation++;
}

