const setup = require("../setup.js");

// setup.createInput(2);
const input = setup.getInput("2");
const games = input.split("\n");

const powers = [];

games.forEach((game, index) => {
  index = index + 1;
  game = game.split(": ")[1];

  const sets = game.split("; ");

  maxColors = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.forEach((set) => {
    set.split(", ").forEach((data) => {
      const array = data.split(" ");

      const value = array[0];
      const color = array[1];

      if (value > maxColors[color]) {
        maxColors[color] = parseInt(value);
      }
    });
  });

  powers.push(maxColors.red * maxColors.green * maxColors.blue);
});

console.log(powers.reduce((acc, a) => acc + a, 0));
