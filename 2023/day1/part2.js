const setup = require("../setup.js");

setup.createInput(1);
const input = setup.getInput(1);

const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let lines = input.split("\n");
let numbers = [];

result = checkForDigits(lines[2]);
console.log(result);

lines.forEach((line) => {
  const result = checkForDigits(line);

  if (result.length == 2) numbers.push(parseInt(`${result[0]}${result[1]}`));
});

console.log(`Sum: ${numbers.reduce((acc, a) => acc + a, 0)}`);

function checkForDigits(string) {
  const values = [];

  const numericRegex = RegExp("\\d", "g");
  let match;

  while ((match = numericRegex.exec(string)) != null) {
    values.push({ number: parseInt(match[0]), pos: match.index });
  }

  Object.keys(map).forEach((number) => {
    const textRegex = RegExp(number, "g");
    let match;

    while ((match = textRegex.exec(string)) != null) {
      values.push({ number: map[number], pos: match.index });
    }
  });

  const result = [];
  values.sort((a, b) => a.pos - b.pos);
  result.push(values.at(0).number);
  result.push(values.at(-1).number);

  return result;
}
