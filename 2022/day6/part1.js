const setup = require("../setup.js");

const input = setup.getInput(6);
// const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

for (let i = 0; i < input.length; i++) {
  let currentMarker = i + 4;

  let testArray = [input[i], input[i + 1], input[i + 2], input[i + 3]];
  let testSet = new Set(testArray);

  if (testSet.size == testArray.length) {
    console.log(currentMarker);
    return;
  }
}
