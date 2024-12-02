const setup = require("../setup.js");
var md5 = require("md5");
// setup.createInput("5");

let nonceValue = 0;
const testString = "uqwqemis";
const input: string = setup.getInput("5");

const password = [];

while (nonceValue < 100000000) {
  if (nonceValue % 100000 == 0) {
    console.log(`nonceValue: ${nonceValue}, chars found: ${password.length}`);
  }

  const hash = md5(testString + `${nonceValue}`);

  if (hash.slice(0, 5) == "00000") {
    password.push(hash[5]);
    console.log(testString + `${nonceValue}`);
  }

  if (password.length == 8) {
    break;
  }

  nonceValue++;
}

console.log(password.join(""));

function isValidHash(test: string) {
  const hash = md5(test);
  return hash.slice(0, 5) == "00000";
}
