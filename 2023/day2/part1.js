const setup = require("../setup.js");

setup.createInput(2);
const input = setup.getInput(2);
const games = input.split("\n");

const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

const validGames = [];

games.forEach((game, index) => {
  index = index + 1;
  game = game.split(": ")[1];

  const sets = game.split("; ");

  let isValidGame = true;

  sets.forEach((set) => {
    set.split(", ").forEach((data) => {
      const array = data.split(" ");

      const value = array[0];
      const color = array[1];

      if (value > rules[color]) {
        isValidGame = false;
      }
    });
  });

  if (isValidGame) validGames.push(index);
});

console.log(validGames.reduce((acc, a) => acc + a, 0));
