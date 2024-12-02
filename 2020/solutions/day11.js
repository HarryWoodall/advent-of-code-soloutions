const fs = require('fs');
let input = fs.readFileSync('Files/day11.txt').toString().split("\r\n");
let testInput = fs.readFileSync('Files/day11Test.txt').toString().split("\r\n");

for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split("");
}

for (let i = 0; i < testInput.length; i++) {
  testInput[i] = testInput[i].split("");
}

let hasSeatingChanged = false;
let sentinal = 3;

module.exports = {
  part1: function() {
    let updatedPositions = [];
    while (sentinal > 0) {
      for(let y = 0; y < testInput.length; y++) {
        let row = [];
        for (let x = 0; x < testInput[y].length; x++) {
          if (testInput[x][y] == "#") {
            row[x] = setEmpty(getAjacentSeats(testInput, x, y)) ? "L" : "#";
          } else if (testInput[x][y] == "L") {
            row[x] = setOccupied(getAjacentSeats(testInput, x, y)) ? "#" : "L";
          } else {
            row[x] = ".";
          }
        }
      }

      if (sentinal == 2) {
        console.log("\n\n");
        console.log(testInput);
        console.log(getAjacentSeats(testInput, 8, 0));
        console.log("\n\n");
      }
      console.log(updatedPositions);
      console.log(`Has Seating changes: ${hasSeatingChanged}`);
      testInput = UpdateInput(updatedPositions);

      if (sentinal == 3) {
        console.log("\n\n");
        console.log(testInput);
        console.log(getAjacentSeats(testInput, 8, 0));
        console.log("\n\n");
      }
      sentinal --;
      hasSeatingChanged = false;
    }
  }
}

function getAjacentSeats(input, x, y) {
  seats = [];
  if (y > 0) {
    // Top 3
    if (x > 0) 
      seats.push(input[x-1][y-1]);

    seats.push(input[x][y-1]);

    if (x < input[x].length - 1) 
      seats.push(input[x+1][y-1]);
  }

  // Middle 2
  if (x > 0) 
      seats.push(input[x-1][y]);

  if (x < input[x].length - 1) 
      seats.push(input[x+1][y]);

  //Bottom 3
  if (y < input.length - 1) {
    if (x > 0) 
      seats.push(input[x-1][y+1]);

    seats.push(input[x][y+1]);

    if (x < input[x].length - 1) 
      seats.push(input[x+1][y+1]);
  }

  return seats;
}

function setEmpty(ajacentSeats) {
  let ammountOccupied = 0;
  for(let i = 0; i < ajacentSeats.length; i++) {
    if (ajacentSeats[i] == "#") {
      ammountOccupied++;
    } 
  }

  if (ammountOccupied >= 4) {
    // console.log(`Seat Change to empty`);
    hasSeatingChanged = true;
    return true;
  } else {
    return false;
  }
}

function setOccupied(ajacentSeats) {
  for(let i = 0; i < ajacentSeats.length; i++) {
    if (ajacentSeats[i] == "#") {
      return false;
    } 
  }

  // console.log(`Seat Change to occupied`);
  hasSeatingChanged = true;
  return true;
}

function UpdateInput(updatedPositions) {
  for(let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      input[i][j] = updatedPositions[i][j];
    }
  }
}