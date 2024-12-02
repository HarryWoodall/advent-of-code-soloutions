const setup = require("../setup.js");

const input = setup.getInput(2);

let valuePairs = input.split("\n");
let totalScore = 0;

// valuePairs = ["A Y", "B X", "C Z"];

for (values of valuePairs) {
  valuesArray = values.split(" ");
  totalScore += calcResult(valuesArray[0], valuesArray[1]);
}

console.log(totalScore);

function calcResult(first, result) {
  // X - Lose
  // Y - Draw
  // Z - Win

  // Rock - 1
  // Paper - 2
  // Scissors - 3

  var shapeMap = [
    ["A", "X", 3], // ROCK SCISSORS
    ["A", "Y", 1], // ROCK ROCK
    ["A", "Z", 2], // ROCK PAPER
    ["B", "X", 1], // PAPER ROCK
    ["B", "Y", 2], // PAPER PAPER
    ["B", "Z", 3], // PAPER SCISSORS
    ["C", "X", 2], // SCISSORS PAPER
    ["C", "Y", 3], // SCISSORS SCISSORS
    ["C", "Z", 1], // SCISSORS ROCK
  ]

  var gameMap = [
    { "X": 0},
    { "Y": 3},
    { "Z": 6},
  ]

  return shapeMap.find(element => element[0] == first && element[1] == result)[2] + gameMap.find(element => Object.keys(element) == result)[result];
}