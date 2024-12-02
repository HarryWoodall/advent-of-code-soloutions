const setup = require("../setup.js");

setup.createInput("7");
const input = setup.getInput("7");
const lines = input.split("\n");

const data = [];
const weights = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

lines.forEach((item) => {
  data.push({
    hand: item.split(/\s+/)[0].split(""),
    bid: item.split(/\s+/)[1],
  });
});

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
  pot += parseInt(item.bid) * (index + 1);
});

console.log(pot);

console.log("full house - 7");
console.log(calculateType(["A", "A", "A", "A", "A"]), 7);
console.log();

console.log("four of a kind - 6");
console.log(calculateType(["A", "A", "8", "A", "A"]), 6);
console.log(calculateType(["A", "A", "J", "A", "A"]), 7);
console.log(calculateType(["J", "J", "A", "J", "J"]), 7);
console.log();

console.log("full house- 5");
console.log(calculateType(["2", "3", "3", "3", "2"]), 5);
console.log(calculateType(["J", "3", "3", "3", "J"]), 7);
console.log(calculateType(["2", "J", "J", "J", "2"]), 7);
console.log();

console.log("three of a kind - 4");
console.log(calculateType(["T", "T", "T", "9", "8"]), 4);
console.log(calculateType(["J", "J", "J", "9", "8"]), 6);
console.log(calculateType(["T", "T", "T", "J", "8"]), 6);
console.log();

console.log("two pair - 3");
console.log(calculateType(["2", "3", "4", "3", "2"]), 3);
console.log(calculateType(["2", "3", "J", "3", "2"]), 5);
console.log(calculateType(["J", "3", "4", "3", "J"]), 6);
console.log();

console.log("One pair - 2");
console.log(calculateType(["A", "2", "3", "A", "4"]), 2);
console.log(calculateType(["A", "J", "3", "A", "4"]), 4);
console.log(calculateType(["J", "2", "3", "J", "4"]), 4);
console.log();

console.log("High card - 1");
console.log(calculateType(["2", "3", "4", "5", "6"]), 1);
console.log(calculateType(["2", "J", "4", "5", "6"]), 2);

function calculateType(hand) {
  if (new Set(hand).size == 1) {
    return 7;
  }

  if (new Set(hand).size == 2) {
    const maxDuplicates = getMaxDuplicates(hand);

    if (maxDuplicates == 4) {
      if (calculateJAmmount(hand) == 1 || calculateJAmmount(hand) == 4) return 7;
      return 6;
    }

    if (calculateJAmmount(hand) == 2 || calculateJAmmount(hand) == 3) return 7;
    return 5;
  }

  if (new Set(hand).size == 3) {
    const maxDuplicates = getMaxDuplicates(hand);

    if (maxDuplicates == 3) {
      if (calculateJAmmount(hand) == 1 || calculateJAmmount(hand) == 3) return 6;
      return 4;
    }

    if (calculateJAmmount(hand) == 2) return 6;
    if (calculateJAmmount(hand) == 1) return 5;
    return 3;
  }

  if (new Set(hand).size == 4) {
    if (calculateJAmmount(hand) == 2 || calculateJAmmount(hand) == 1) return 4;
    return 2;
  }

  if (calculateJAmmount(hand) == 1) return 2;
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

function calculateJAmmount(hand) {
  let sum = 0;
  hand.forEach((item) => {
    if (item == "J") sum++;
  });

  return sum;
}
