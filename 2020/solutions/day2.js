const fs = require('fs');
const { off } = require('process');

let input;

module.exports = {
  part1: function() {
    input = fs.readFileSync('Files/day2.txt').toString().split("\n");
    let ammount = 0;
    for (let i = 0; i < input.length; i++) {
      let items = input[i].split(" ");

      let values = items[0].split("-");
      let letter = items[1].charAt(0);
      let password = items[2];
      let regex = new regex(letter, "g");

      if (isCorrect((password.match(regex) || []).length, values)) {
        ammount++;
      }
    }
    console.log("ammount: ", ammount);

  }
}

module.exports = {
  part2: function() {
    input = fs.readFileSync('Files/day2.txt').toString().split("\n");
    let ammount = 0;
    for (let i = 0; i < input.length; i++) {
      let items = input[i].split(" ");

      let values = items[0].split("-");
      let letter = items[1].charAt(0);
      let password = items[2];


      if (isValid(password, values, letter)) {
        ammount++;
      }
    }
    console.log("ammount: ", ammount);

    // part2Test();

  }
}

function isCorrect(ammount, values) {
  if (ammount >= parseInt(values[0]) && ammount <= parseInt(values[1])) {
    return true;
  }
}

function isValid(password, values, letter) {
  let isValid = false;
  let offset1 = parseInt(values[0]) - 1;
  let offset2 = parseInt(values[1]) - 1;
  
  if (password.charAt(offset1) == letter) {
    isValid = !isValid;
  }

  if (password.charAt(offset2) == letter) {
    isValid = !isValid;
  }

  return isValid;
}

function part2Test() {
  input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

  let ammount = 0;
    for (let i = 0; i < 3; i++) {
      let items = input[i].split(" ");

      let values = items[0].split("-");
      let letter = items[1].charAt(0);
      let password = items[2];


      if (isValid(password, values, letter)) {
        ammount++;
      }
    }
    console.log("ammount: ", ammount);
}