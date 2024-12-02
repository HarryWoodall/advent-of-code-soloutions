const setup = require("../setup.js");

const input = setup.getInput(2);

let valuePairs = input.split("\n");
let totalScore = 0;



// valuePairs = ["A Y", "B X", "C Z"];
let i = 0;

for (values of valuePairs) {

  valuesArray = values.split(" ");
  try {
    totalScore += calcScore(valuesArray[0], valuesArray[1]);
  } catch (err) {
    console.log(err);
    console.log("values: " + valuePairs);
  }
  i++;
}

console.log(i);
console.log(totalScore);


function calcScore(first, second) {

  var gameMap = [
    ["A", "X", 3], // ROCK ROCK
    ["A", "Y", 6], // ROCK PAPER
    ["A", "Z", 0], // ROCK SCISSORS
    ["B", "X", 0], // PAPER ROCK
    ["B", "Y", 3], // PAPER PAPER
    ["B", "Z", 6], // PAPER SCISSORS
    ["C", "X", 6], // SCISSORS ROCK
    ["C", "Y", 0], // SCISSORS PAPER
    ["C", "Z", 3], // SCISSORS SCISSORS
  ]

  var shapeMap = [
    { "X": 1},
    { "Y": 2},
    { "Z": 3},
  ]


  gameScore = gameMap.find(element => element[0] == first && element[1] == second)[2] + shapeMap.find(element => Object.keys(element) == second)[second];
  if (gameScore < 1) {
    console.log("sjhdshd");
  }
  return gameScore;
}