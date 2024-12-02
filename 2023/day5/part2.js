const setup = require("../setup.js");

const input = setup.getInput("5");

const mapNames = ["seeds", "soilMap", "fertilizerMap", "waterMap", "lightMap", "temperatureMap", "humidityMap", "locationMap"];

let maps = input.split("\n\n");
let seedValues = maps[0]
  .split(": ")[1]
  .split(" ")
  .map((seed) => parseInt(seed));

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

const ranges = [];

generateSeeds();

maps.forEach((map, index) => ranges.push(getRanges(map, mapNames[index])));

console.log(seedValues.sort((a, b) => a.start - b.start));
console.log("");

ranges.forEach((range) => calculateRangeMappings(range, seedValues));

function generateSeeds() {
  const actualSeeds = [];
  for (let i = 0; i < seedValues.length; i += 2) {
    actualSeeds.push({
      start: seedValues[i],
      end: seedValues[i] + seedValues[i + 1],
    });
  }

  seedValues = actualSeeds;
}

function getRanges(map, name) {
  const lines = map.split("\n");
  const result = {
    name: name,
    min: Number.MAX_SAFE_INTEGER,
    max: 0,
    ranges: [],
  };

  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(" ").map((item) => parseInt(item));
    if (values[1] < result.min) result.min = values[1];
    if (values[1] + values[2] - 1 > result.max) result.max = values[1] + values[2] - 1;

    result.ranges.push({
      min: values[1],
      max: values[1] + values[2] - 1,
      source: values[0],
    });
  }

  const rangesFound = result.ranges.length;

  result.ranges.sort((a, b) => a.min - b.min);

  for (let i = 0; i < rangesFound - 1; i++) {
    if (result.ranges[i].max + 1 != result.ranges[i + 1].min) {
      result.ranges.push({
        min: result.ranges[i].max + 1,
        max: result.ranges[i + 1].min - 1,
        source: -1,
      });
    }
  }

  result.ranges.sort((a, b) => a.min - b.min);
  // console.log(result);
  return result;
}

function calculateRangeMappings(map, seeds) {
  let currentRange = {};
  const newSeedRanges = [];

  if (map.min > 0) {
    currentRange = {
      min: 0,
      max: map.min - 1,
      source: -1,
    };

    newSeedRanges.push(...calculateNewRanges(seeds, currentRange));
  }

  map.ranges.forEach((range) => {
    currentRange = range;
    newSeedRanges.push(...calculateNewRanges(seeds, currentRange));
  });

  if (map.max < seeds[seeds.length - 1].end) {
    currentRange = {
      min: map.max + 1,
      max: seeds[seeds.length - 1].end,
      source: -1,
    };

    newSeedRanges.push(...calculateNewRanges(seeds, currentRange));
  }

  newSeedRanges.sort((a, b) => a.start - b.start);

  console.log(map.name);
  console.log(newSeedRanges);
  console.log(`Lowest ${newSeedRanges[0].start}`);
  console.log();

  seedValues = newSeedRanges.sort((a, b) => a.start - b.start);
}

function calculateNewRanges(seeds, currentRange) {
  const ranges = [];
  const seedsInRange = getSeedsInRange(seeds, currentRange);

  seedsInRange.forEach((seed) => {
    let min;
    let max;
    let offset = currentRange.source == -1 ? 0 : currentRange.source - currentRange.min;
    if (seed.start < currentRange.min) min = currentRange.min + offset;
    else min = seed.start + offset;

    if (seed.end > currentRange.max) max = currentRange.max + offset;
    else max = seed.end + offset;

    ranges.push({
      start: min,
      end: max,
    });
  });

  return ranges;
}

function getSeedsInRange(seeds, currentRange) {
  const seedsInRange = [];

  seeds.forEach((seed) => {
    if (seed.end > currentRange.min && seed.start < currentRange.max) {
      seedsInRange.push(seed);
    }
  });

  return seedsInRange;
}

// function mapNumber(map, number) {
//   const lines = map.split("\n");

//   for (let i = 0; i < lines.length; i++) {
//     const values = lines[i].split(" ").map((item) => parseInt(item));

//     if (number >= values[1] && number < values[1] + values[2]) {
//       return number - values[1] + values[0];
//     }
//   }

//   return number;
// }
