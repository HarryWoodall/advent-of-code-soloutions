const setup = require("../setup.js");

const input = setup.getInput("5");

let maps = input.split("\n\n");
let seedValues = maps[0].split(": ")[1].split(" ");

maps = maps
  .map((item, index) => {
    if (index !== 0) {
      return item.split(":\n")[1];
    }

    return item;
  })
  .filter((item, index) => {
    return index != 0;
  });

// const seeds = categories[0].split(": ")[1];
// const soilMap = categories[1].split(":\n")[1];
// const fertilizerMap = categories[2].split(":\n")[1];
// const waterMap = categories[3].split(":\n")[1];
// const lightMap = categories[4].split(":\n")[1];
// const temperatureMap = categories[5].split(":\n")[1];
// const humidityMap = categories[6].split(":\n")[1];
// const locationMap = categories[7].split(":\n")[1];

for (let i = 0; i < maps.length; i++) {
  const newSeeds = [];
  seedValues.forEach((seed) => {
    result = mapNumber(maps[i], parseInt(seed));
    newSeeds.push(result);
  });

  seedValues = newSeeds;
  console.log(newSeeds);
  console.log("");
}

console.log(seedValues.sort());
console.log(seedValues.sort()[0]);

function mapNumber(map, number) {
  const lines = map.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(" ").map((item) => parseInt(item));

    if (number >= values[1] && number < values[1] + values[2]) {
      return number - values[1] + values[0];
    }
  }

  return number;
}
