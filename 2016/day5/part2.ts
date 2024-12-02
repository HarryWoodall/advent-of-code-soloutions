const setup = require("../setup.js");
var md5 = require("md5");
// setup.createInput("5");

let nonceValue = 0;
const testString = "uqwqemis";
const input: string = setup.getInput("5");

const password = ["_", "_", "_", "_", "_", "_", "_", "_"];
let charsFound = 0;

while (nonceValue < 100000000) {
  if (nonceValue % 100000 == 0) {
    console.log(`nonceValue: ${nonceValue}, ${password.join("")}`);
  }

  const hash = md5(testString + `${nonceValue}`);

  if (hash.slice(0, 5) == "00000") {
    console.log(`hash found`);
    if (hash[5] >= "0" && hash[5] < "8") {
      const pos = parseInt(hash[5]);

      console.log(nonceValue, hash);

      if (password[pos] == "_") {
        password[pos] = hash[6];
        charsFound++;

        console.log(`Charcter ${hash[6]} at pos ${hash[5]}`);
      } else {
        console.log(`Non valid password character`);
      }
    }
  }

  if (charsFound == 8) {
    break;
  }

  nonceValue++;
}

console.log(password.join(""));

function isValidHash(test: string) {
  const hash = md5(test);
  return hash.slice(0, 5) == "00000";
}
