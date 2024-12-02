const setup = require("../setup.js");

setup.createInput("4");
const input = setup.getInput("4");

const cards = input.split("\n");

const cardMap = {};
for (let i = 0; i < cards.length; i++) {
  cardMap[i + 1] = 1;
}

let points = 0;

cards.forEach((card, index) => {
  const data = card.split(": ")[1];
  const winningNumbers = data.split(" | ")[0].split(/\s+/);
  const otherNumbers = data.split(" | ")[1].split(/\s+/);

  const intersection = winningNumbers.filter((num) => otherNumbers.includes(num)).filter((item) => item != "");

  for (let i = 0; i < intersection.length; i++) {
    cardMap[index + 2 + i] += cardMap[index + 1];
  }

  if (intersection.length > 0) points += Math.pow(2, intersection.length - 1);
});

let cardAmmount = 0;
Object.keys(cardMap).forEach((card) => (cardAmmount += cardMap[card]));
console.log(cardMap);
console.log(cardAmmount);
