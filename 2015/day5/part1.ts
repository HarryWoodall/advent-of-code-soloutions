const setup = require("../setup.js");
const md5 = require("js-md5");

// setup.createInput("5");
const input: string = setup.getInput("5");
const words = input.split("\n");
let goodStringCount = 0;

words.forEach((word) => {
  console.log(word + ": ");
  // if (invalidSubstrings(word)) {
  //   console.log(`${word} contains invalid characters`);
  // }

  // if (doubleLetter(word)) {
  //   console.log(`${word} contains double letters`);
  // }

  // if (vowelCount(word)) {
  //   console.log(`${word} contains atleast 3 vowels`);
  // }
  const isGood = !invalidSubstrings(word) && doubleLetter(word) && vowelCount(word);
  goodStringCount += isGood ? 1 : 0;
  console.log(`${word} is good: ${isGood}`);
  // console.log();
});

console.log(goodStringCount);

function invalidSubstrings(word: string) {
  const badStrings = ["ab", "cd", "pq", "xy"];
  let isInvalid = false;

  badStrings.forEach((str) => {
    if (word.includes(str)) isInvalid = true;
  });

  return isInvalid;
}

function doubleLetter(word: string) {
  const chars = word.split("");
  let previousLetter = "";
  let hasDoubleLetter = false;

  chars.forEach((letter) => {
    if (letter == previousLetter) hasDoubleLetter = true;
    previousLetter = letter;
  });

  return hasDoubleLetter;
}

function vowelCount(word: string) {
  const chars = word.split("");
  const vowels = ["a", "e", "i", "o", "u"];
  let vowelCount = 0;

  chars.forEach((letter) => {
    if (vowels.includes(letter)) vowelCount++;
  });

  return vowelCount >= 3;
}

export {};
