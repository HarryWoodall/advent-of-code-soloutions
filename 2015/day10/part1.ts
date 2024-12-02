const setup = require("../setup.js");

// setup.createInput("9");
// let input: string = setup.getInput("10");
let input: string = "1113122113";

console.log(input);
let previousLength = 0;

for (let i = 0; i < 50; i++) {
  input = splitString(input).join("");
  // console.log(input);
  // console.log();
  // console.log(input.length);
  // console.log("lengthDiff: ", input.length - previousLength);
  // previousLength = input.length;
}

console.log(input.length);

function splitString(string: string) {
  const chars = string.split("");

  if (chars.length == 1) {
    return ["1", chars[0]];
  }

  let currentChar = chars[0];
  let charLength = 1;
  const resultArray: string[] = [];

  for (let i = 1; i < chars.length; i++) {
    if (chars[i] != currentChar) {
      resultArray.push(`${charLength}`);
      resultArray.push(currentChar);
      currentChar = chars[i];
      charLength = 0;
    }

    charLength++;
  }

  resultArray.push(`${charLength}`);
  resultArray.push(currentChar);

  return resultArray;
}

export {};
