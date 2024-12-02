const setup = require("../setup.js");
const md5 = require("js-md5");

// setup.createInput("5");
const input: string = setup.getInput("5");
const words = input.split("\n");
let goodStringCount = 0;

words.forEach((word) => {
  console.log(word + ": ");
  if (letterPair(word)) {
    console.log(`${word} contains letter pair`);
  }

  if (repeatingLetter(word)) {
    console.log(`${word} contains double letters`);
  }

  const isGood = letterPair(word) && repeatingLetter(word);
  goodStringCount += isGood ? 1 : 0;
  console.log(`${word} is good: ${isGood}`);
  console.log();
});

console.log(goodStringCount);

function letterPair(word: string) {
  let hasLetterPair = false;
  type letterPairing = {
    letters: Array<string>;
    index: number;
  };

  const characters = word.split("");
  const letterPairs: letterPairing[] = [];

  characters.forEach((char, index) => {
    if (index == 0) return;

    letterPairs.push({
      index: index - 1,
      letters: [characters[index - 1], char],
    });
  });

  letterPairs.forEach((item) => {
    if (letterPairs.some((lp) => lp.letters[0] == item.letters[0] && lp.letters[1] == item.letters[1] && Math.abs(lp.index - item.index) > 1))
      hasLetterPair = true;
  });

  return hasLetterPair;
}

function repeatingLetter(word: string) {
  const characters = word.split("");
  let hasRepeatingCharacter = false;

  characters.forEach((char, index) => {
    if (index < 2) return;

    if (char == characters[index - 2]) hasRepeatingCharacter = true;
  });

  return hasRepeatingCharacter;
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
