const setup = require("../setup.js");

const input = setup.getInput(6);
// const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

for (let i = 0; i < input.length; i++) {
  const windowLength = 14;
  let currentMarker = i + windowLength;

  let testArray = [];
  for (let j = 0; j < windowLength; j++) {
    testArray.push(input[i + j]);
  }

  let testSet = new Set(testArray);

  if (testSet.size == testArray.length) {
    console.log(currentMarker);
    return;
  }
}
