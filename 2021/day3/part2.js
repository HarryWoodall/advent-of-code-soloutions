const fs = require("fs");
const setup = require("../setup");

let input = setup.getInput(3);
// let input = "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";

let rows = input.split("\n");

let currentRow = 0;
let bitCount = 0;
let currentCommonValue;

// function filterRowsMostCommon() {
//   if (rows.length != 1) {
//     for (row of rows) {
//       if (row[currentRow] == 1) bitCount++;
//     }

//     currentCommonValue = bitCount >= rows.length / 2 ? 1 : 0;
//     rows = rows.filter((_) => _[currentRow] == currentCommonValue);

//     console.log(rows);

//     bitCount = 0;
//     currentRow++;

//     filterRowsMostCommon();
//   } else {
//     console.log(parseInt(rows[0], 2));
//   }
// }

// filterRowsMostCommon();

function filterRowsLeastCommon() {
  if (rows.length != 1) {
    for (row of rows) {
      if (row[currentRow] == 1) bitCount++;
    }

    currentCommonValue = bitCount >= rows.length / 2 ? 0 : 1;
    rows = rows.filter((_) => _[currentRow] == currentCommonValue);

    console.log(rows);

    bitCount = 0;
    currentRow++;

    filterRowsLeastCommon();
  } else {
    console.log(parseInt(rows[0], 2));
  }
}

filterRowsLeastCommon();
