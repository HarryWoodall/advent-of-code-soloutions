const setup = require("../setup.js");
const fs = require("fs");

// setup.createInput("15");
let input: string = setup.getInput("15");
const lines = input.split("\n");
const ingredients: Ingredient[] = [];

type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

lines.forEach((line) => {
  const name = line.split(": ")[0];
  const details = line.split(": ")[1];

  const capacity = parseInt(details.split(", ")[0].split(" ")[1]);
  const durability = parseInt(details.split(", ")[1].split(" ")[1]);
  const flavor = parseInt(details.split(", ")[2].split(" ")[1]);
  const texture = parseInt(details.split(", ")[3].split(" ")[1]);
  const calories = parseInt(details.split(", ")[4].split(" ")[1]);

  ingredients.push({
    name: line.split(": ")[0],
    capacity: capacity,
    durability: durability,
    flavor: flavor,
    texture: texture,
    calories: calories,
  });
});

// console.log(ingredients);
const limit = 100;
let highestScore = -Infinity;
let ratio = [];

for (let i = limit; i >= 0; i--) {
  for (let j = limit - i; j >= 0; j--) {
    let k = limit - i - j;
    for (let k = limit - i - j; k >= 0; k--) {
      let l = limit - i - j - k;
      // console.log(i, j, k, l);

      const score = calculateScore([
        {
          ingredient: ingredients[0],
          ammount: i,
        },
        {
          ingredient: ingredients[1],
          ammount: j,
        },
        {
          ingredient: ingredients[2],
          ammount: k,
        },
        {
          ingredient: ingredients[3],
          ammount: l,
        },
      ]);

      if (score > highestScore) {
        highestScore = score;
        ratio = [i, j, k, l];
      }
    }
  }
}

// for (let i = limit; i >= 0; i--) {
//   let j = limit - i;
//   // console.log(i, j);
// }

console.log(highestScore);
console.log(ratio);

function calculateScore(items: { ingredient: Ingredient; ammount: number }[]) {
  let capacity = 0;
  let durability = 0;
  let flavor = 0;
  let texture = 0;
  let calories = 0;

  items.forEach((item) => {
    capacity += item.ingredient.capacity * item.ammount;
    durability += item.ingredient.durability * item.ammount;
    flavor += item.ingredient.flavor * item.ammount;
    texture += item.ingredient.texture * item.ammount;
    calories += item.ingredient.calories * item.ammount;
  });

  if (calories != 500) return -Infinity;

  return Math.max(capacity, 0) * Math.max(durability, 0) * Math.max(flavor, 0) * Math.max(texture, 0);
}

export {};
