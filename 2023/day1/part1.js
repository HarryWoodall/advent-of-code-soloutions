const setup = require("../setup.js");

setup.createInput(1);
const input = setup.getInput(1);

let lines = input.split("\n");
let numbers = [];

lines.forEach((line) => {
  let first = null;
  let last = null;

  //   console.log(line);

  line.split("").forEach((character) => {
    if (isDigit(character)) {
      if (first == null) {
        first = character;
      }

      last = character;
    }
  });

  if (first != null) numbers.push(parseInt(`${first}${last}`));
});

console.log(`Sum: ${numbers.reduce((acc, a) => acc + a, 0)}`);

function isDigit(char) {
  return /^\d$/.test(char);
}
