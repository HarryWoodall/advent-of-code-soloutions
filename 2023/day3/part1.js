const setup = require("../setup.js");

setup.createInput("3");
const input = setup.getInput("3");

const lines = input.split("\n");

const charMap = [];

lines.forEach((line) => {
  const lineArray = [];
  line.split("").forEach((char) => {
    lineArray.push(char);
  });

  charMap.push(lineArray);
});

const partValues = [];

let currentNumber = {
  isNumeric: false,
  currentY: null,
  startPos: null,
  endPos: null,
  value: [],
};

for (let y = 0; y < charMap.length; y++) {
  for (let x = 0; x < charMap[0].length; x++) {
    const currentSymbol = charMap[y][x];

    if (!currentNumber.isNumeric && isNumber(currentSymbol)) {
      currentNumber.isNumeric = true;
      currentNumber.currentY = y;
      currentNumber.startPos = x;
      currentNumber.value.push({
        value: parseInt(charMap[y][x]),
        x: x,
        y: y,
      });
    } else if (isNumber(currentSymbol)) {
      currentNumber.value.push({
        value: parseInt(charMap[y][x]),
        x: x,
        y: y,
      });
    } else if (currentNumber.isNumeric && !isNumber(currentSymbol)) {
      currentNumber.endPos = x;
      let result = visualizeSurrounding(currentNumber.value);
      if (result) partValues.push(parseInt(currentNumber.value.map((item) => item.value).join("")));

      if (!result) {
      }

      currentNumber.isNumeric = false;
      currentNumber.startPos = null;
      currentNumber.endPos = null;
      currentNumber.value = [];
    }
  }
}

console.log(partValues.reduce((acc, a) => acc + a, 0));

// visualizeSurrounding([
//   {
//     value: 4,
//     x: 0,
//     y: 0,
//   },
//   {
//     value: 6,
//     x: 1,
//     y: 0,
//   },
//   {
//     value: 7,
//     x: 2,
//     y: 0,
//   },
// ]);

function visualizeSurrounding(array) {
  let hasSymbol = false;
  const gridResult = [];

  for (let i = 0; i < 3; i++) {
    if (i != 1) gridResult.push(Array(array.length + 2).fill("."));
    else gridResult.push([".", ...array.map((item) => item.value), "."]);
  }

  array.forEach((item, index) => {
    const gridItemsToCheck = [
      [
        [item.x - 1, item.y - 1],
        [item.x, item.y - 1],
        [item.x + 1, item.y - 1],
      ],
      [[item.x - 1, item.y], [], [item.x + 1, item.y]],
      [
        [item.x - 1, item.y + 1],
        [item.x, item.y + 1],
        [item.x + 1, item.y + 1],
      ],
    ];

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const ord = gridItemsToCheck[y][x];
        if (isValidOrd(ord) && charMap[ord[1]][ord[0]] != "." && !isNumber(charMap[ord[1]][ord[0]])) {
          hasSymbol = true;
          gridResult[y][x + index] = charMap[ord[1]][ord[0]];
        }
      }
    }
  });

  gridResult.forEach((row) => {
    console.log(row.join(""));
  });
  console.log("");

  return hasSymbol;
}

function checkNumberRange() {
  for (let i = currentNumber.startPos; i < currentNumber.endPos; i++) {
    if (hasAjacentSymbol(currentNumber.currentY, i)) return true;
  }

  return false;
}

function hasAjacentSymbol(x, y) {
  let hasSymbol = false;
  const gridItemsToCheck = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  gridItemsToCheck.forEach((ord) => {
    if (isValidOrd(ord) && charMap[ord[0]][ord[1]] != "." && !isNumber(charMap[ord[0]][ord[1]])) {
      hasSymbol = true;
    }
  });

  return hasSymbol;
}

function isValidOrd(ord) {
  if (!(ord[0] >= 0 && ord[0] < charMap.length)) return false;
  if (!(ord[1] >= 0 && ord[1] < charMap[0].length)) return false;

  return true;
}

function isNumber(char) {
  return /^[0-9]$/.test(char);
}
