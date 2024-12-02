const setup = require("../setup.js");

// setup.createInput("9");
// let input: string = setup.getInput("10");
let input: string = "abcdefgh";
let testInputs: string[] = ["hijklmmn", "abbceffg", "abbcegjk", "abdefzizo", "abcdffaa"];

function validate() {
  // testInputs.forEach((input) => console.log(firstValidation(input)));
  // testInputs.forEach((input) => console.log(secondValidation(input)));
  // testInputs.forEach((input) => console.log(thirdValidation(input)));

  let password = "hepxxyzz";
  password = incrementPassword(password);
  let itterarions = 0;
  while (!(firstValidation(password) && secondValidation(password) && thirdValidation(password)) && itterarions < 10000000) {
    if (itterarions % 10000 == 0) console.log("Itteration: ", itterarions);
    password = incrementPassword(password);
    itterarions++;
  }

  console.log(itterarions);
  console.log(password);
}

function firstValidation(password: string) {
  const chars = password.split("");
  let maxCharStraight = 1;
  let currentCharStraight = 1;
  chars.forEach((char, index) => {
    if (index == 0) return;

    const currentChar = char;
    const previousChar = chars[index - 1];

    if (previousChar.charCodeAt(0) + 1 == currentChar.charCodeAt(0)) {
      currentCharStraight++;
    } else {
      maxCharStraight = Math.max(maxCharStraight, currentCharStraight);
      currentCharStraight = 1;
    }
  });

  return maxCharStraight >= 3;
}

function secondValidation(password: string) {
  const chars = password.split("");
  const invalidChars = ["i", "o", "l"];
  let isValid = true;

  chars.forEach((char) => {
    if (invalidChars.includes(char)) isValid = false;
  });

  return isValid;
}

function thirdValidation(password: string) {
  const chars = password.split("");
  let maxCharStraightAmmount = 0;
  let maxCharStraight = 1;
  let currentCharStraight = 1;

  chars.forEach((char, index) => {
    if (index == 0) return;

    const currentChar = char;
    const previousChar = chars[index - 1];

    if (previousChar == currentChar) {
      currentCharStraight++;
    } else {
      if (currentCharStraight == 2) maxCharStraightAmmount++;
      // maxCharStraight = Math.max(maxCharStraight, currentCharStraight);
      currentCharStraight = 1;
    }
  });

  if (currentCharStraight == 2) maxCharStraightAmmount++;

  return maxCharStraightAmmount >= 2;
}

function incrementPassword(password: string) {
  const chars = password.split("");
  let carry = true;
  for (let i = chars.length - 1; i >= 0; i--) {
    if (carry) {
      chars[i] = String.fromCharCode(((chars[i].charCodeAt(0) - 97 + 1) % 26) + 97);
      carry = false;
    } else break;

    carry = !carry && chars[i] == "a";
  }

  return chars.join("");

  // console.log("a".charCodeAt(0) - 97);
  // console.log("z".charCodeAt(0) - 97);
}

validate();

export {};
