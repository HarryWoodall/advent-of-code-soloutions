const setup = require("../setup.js");
const fs = require("fs");

// setup.createInput("16");
let input: string = setup.getInput("16");
const lines = input.split("\n");

type Aunt = {
  number: number;
  children?: number | undefined;
  cats?: number | undefined;
  samoyeds?: number | undefined;
  pomeranians?: number | undefined;
  akitas?: number | undefined;
  vizslas?: number | undefined;
  goldfish?: number | undefined;
  trees?: number | undefined;
  cars?: number | undefined;
  perfumes?: number | undefined;
};

const aunts: Aunt[] = [];

lines.forEach((line, index) => {
  // if (index > 0) return;

  const number = parseInt(line.split(": ")[0].split(" ")[1]);
  const data = line.split(/[0-9]+: /)[1].split(", ");
  const aunt: Aunt = {
    number: number,
  };

  data.forEach((d) => {
    const key = d.split(": ")[0] as keyof Aunt;
    const value = parseInt(d.split(": ")[1]);

    aunt[key] = value;
  });

  aunts.push(aunt);
});

// console.log(JSON.stringify(aunts, null, 2));
const target = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const targetAuntArray = aunts.filter((aunt) => {
  let targetAunt = true;
  Object.keys(target).forEach((key) => {
    if (aunt[key] != undefined) {
      if ((key == "cats" || key == "trees") && aunt[key] <= target[key]) {
        targetAunt = false;
      } else if ((key == "pomeranians" || key == "goldfish") && aunt[key] >= target[key]) {
        targetAunt = false;
      } else if (!(key == "pomeranians" || key == "goldfish" || key == "cats" || key == "trees") && aunt[key] != target[key]) {
        targetAunt = false;
      }
    }
  });

  return targetAunt;
});

console.log(targetAuntArray);

export {};
