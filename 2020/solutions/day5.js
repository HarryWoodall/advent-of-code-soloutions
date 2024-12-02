
const fs = require('fs');

const seats = createSeatArray();

module.exports = {
  part1: function() {
    input = fs.readFileSync('Files/day5.txt').toString().split("\r\n");

    testInput = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];
    
    
    let highestId = 0;

    for(let i = 0; i < input.length; i++) {
      let row = getRow(input[i].substring(0, 7));
      let col = getCol(input[i].substring(7, 10));
      let id = getSeatId(col, row);
      seats[row][col] = `${col} ${row}`;
      


      if (id > highestId) {
        highestId = id;
      }
    }

    console.log(...seats);
    console.log(getSeatId(4, 66));
    console.log(highestId);
  }
}

function getRow(input) {
  let upper = 127;
  let lower = 0;

  for (let i = 0; i < 7; i++) {
    if (input.charAt(i) == "B") {
      if (upper - lower % 2 == 0) {
        lower += (upper - lower) / 2;
      } else {
        lower += ((upper - lower) + 1) / 2;
      }
    } else {
      if (upper - lower % 2 == 0) {
        upper -= (upper - lower) / 2;
      } else {
        upper -= ((upper - lower) + 1) / 2;
      }
    }
  }
  return upper;
}

function getCol(input) {
  let upper = 7;
  let lower = 0;

  for (let i = 0; i < 3; i++) {
    if (input.charAt(i) == "R") {
      if (upper - lower % 2 == 0) {
        lower += (upper - lower) / 2;
      } else {
        lower += ((upper - lower) + 1) / 2;
      }
    } else {
      if (upper - lower % 2 == 0) {
        upper -= (upper - lower) / 2;
      } else {
        upper -= ((upper - lower) + 1) / 2;
      }
    }
  }
  return upper;
}

function getSeatId(col, row) {
  return (row * 8) + col;
}

function createSeatArray() {
  let array = [];
  for (let i = 0; i < 127; i++) {
    array[i] = [];
    for (let j = 0; j < 7; j++) {
      array[i][j] = null;
    }
  }
  return array;
}