const setup = require("../setup.js");
const md5 = require("js-md5");

// setup.createInput("4");
const input: string = setup.getInput("4-test");
let currentNonce = 0;
const key = "ckczppom";

console.log("starting run");

while (!isCorrectHash(md5(`${key}${currentNonce}`))) {
  if (currentNonce % 100 == 0) {
    console.log(currentNonce);
  }
  currentNonce++;
}

console.log("finnished with value of ", currentNonce);
console.log(md5(`${key}${currentNonce}`));

function isCorrectHash(hash: string) {
  return hash.slice(0, 6) == "000000";
}

export {};
