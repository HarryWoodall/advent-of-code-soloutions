const setup = require("../setup.js");

setup.createInput("3");
const input = setup.getInput("3");

const lines = input.split("\n");

const charMap = [];
const gearMap = [];

lines.forEach((line) => {
  const lineArray = [];
  line.split("").forEach((char) => {
    lineArray.push(char);
  });

  charMap.push(lineArray);
});

const ratios = [];

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
      visualizeSurrounding(currentNumber.value);

      currentNumber.isNumeric = false;
      currentNumber.startPos = null;
      currentNumber.endPos = null;
      currentNumber.value = [];
    }
  }
}

gearMap.forEach((item) => {
  console.log(item.value, item.ords);
});

const gearsLookedAt = [];

gearMap.forEach((gear) => {
  gear.ords.forEach((ord) => {
    if (gearsLookedAt.some((item) => item.x == ord.x && item.y == ord.y)) return;

    const duplicates = gearMap.filter((item) => item.ords.filter((itemOrd) => ord.x == itemOrd.x && ord.y == itemOrd.y).length > 0);

    if (duplicates.length == 2) {
      console.log(duplicates);
      ratios.push(duplicates[0].value * duplicates[1].value);
    }

    gearsLookedAt.push(ord);
  });
});

console.log(ratios.reduce((acc, a) => acc + a, 0));

function visualizeSurrounding(array) {
  let hasSymbol = false;
  const gridResult = [];
  const gears = [];

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
          if (charMap[ord[1]][ord[0]] == "*") {
            if (!gears.some((item) => item.x == ord[0] && item.y == ord[1])) {
              gears.push({
                x: ord[0],
                y: ord[1],
              });
            }
          }
          gridResult[y][x + index] = charMap[ord[1]][ord[0]];
        }
      }
    }
  });

  gridResult.forEach((row) => {
    console.log(row.join(""));
  });
  console.log("");

  if (gears.length) gearMap.push({ value: parseInt(array.map((item) => item.value).join("")), ords: gears });

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
