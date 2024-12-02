const setup = require("../setup.js");

setup.createInput("7");
const input = setup.getInput("7");
const lines = input.split("\n");

const data = [];
const weights = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

lines.forEach((item) => {
  data.push({
    hand: item.split(/\s+/)[0].split(""),
    bid: item.split(/\s+/)[1],
  });
});

// console.log(calculateType(["A", "A", "A", "A", "A"]));
// console.log(calculateType(["A", "A", "8", "A", "A"]));
// console.log(calculateType(["2", "3", "3", "3", "2"]));
// console.log(calculateType(["T", "T", "T", "9", "8"]));
// console.log(calculateType(["2", "3", "4", "3", "2"]));
// console.log(calculateType(["A", "2", "3", "A", "4"]));
// console.log(calculateType(["2", "3", "4", "5", "6"]));

data.sort((a, b) => {
  const aType = calculateType(a.hand);
  const bType = calculateType(b.hand);

  if (aType == bType) {
    for (let i = 0; i < 5; i++) {
      if (a.hand[i] == b.hand[i]) continue;

      return weights.indexOf(a.hand[i]) - weights.indexOf(b.hand[i]);
    }
  }

  return aType - bType;
});

let pot = 0;

data.forEach((item, index) => {
  // console.log(`${parseInt(item.bid)} * ${index + 1} = ${parseInt(item.bid) * (index + 1)}`);
  pot += parseInt(item.bid) * (index + 1);
});

console.log(pot);

function calculateType(hand) {
  if (new Set(hand).size == 1) {
    return 7;
  }

  if (new Set(hand).size == 2) {
    const maxDuplicates = getMaxDuplicates(hand);

    if (maxDuplicates == 4) return 6;
    return 5;
  }

  if (new Set(hand).size == 3) {
    const maxDuplicates = getMaxDuplicates(hand);

    if (maxDuplicates == 3) return 4;
    return 3;
  }

  if (new Set(hand).size == 4) {
    return 2;
  }

  return 1;
}

function getMaxDuplicates(hand) {
  let maxDuplicates = 0;
  const duplicates = {};
  hand.forEach((item) => (duplicates[item] = (duplicates[item] || 0) + 1));
  Object.keys(duplicates).forEach((item) => {
    if (duplicates[item] > maxDuplicates) maxDuplicates = duplicates[item];
  });

  return maxDuplicates;
}
