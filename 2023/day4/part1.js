const setup = require("../setup.js");

setup.createInput("4");
const input = setup.getInput("4");

const cards = input.split("\n");

let points = 0;

cards.forEach((card, index) => {
  const data = card.split(": ")[1];
  const winningNumbers = data.split(" | ")[0].split(/\s+/);
  const otherNumbers = data.split(" | ")[1].split(/\s+/);

  const intersection = winningNumbers.filter((num) => otherNumbers.includes(num)).filter((item) => item != "");

  console.log(intersection);

  if (intersection.length > 0) points += Math.pow(2, intersection.length - 1);
});

console.log(points);
