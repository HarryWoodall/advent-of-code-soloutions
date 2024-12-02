const setup = require("../setup.js");
const fs = require("fs");

// setup.createInput("17");
let input: string = setup.getInput("17");
const lines = input.split("\n");
const targetValue = 150;

type Container = {
  id: number;
  value: number;
};

const containers = lines
  .map((line, index) => {
    return {
      id: index,
      value: parseInt(line),
    };
  })
  .sort((a, b) => b.value - a.value);
console.log(containers.map((c) => c.value));
const validCombos: Container[][] = [];

for (let i = 0; i < containers.length; i++) {
  let currentCombo: Container[] = [containers[i]];

  for (let j = i + 1; j < containers.length; j++) {
    if (getComboSize(currentCombo) + containers[j].value > targetValue) continue;

    if (getComboSize(currentCombo) + containers[j].value == targetValue && !isDuplicateCombo(validCombos, [...currentCombo, containers[j]])) {
      validCombos.push([...currentCombo, containers[j]]);
      currentCombo = [containers[i]];
    }

    if (getComboSize(currentCombo) + containers[j].value < targetValue) {
      currentCombo.push(containers[j]);
    }
  }
}

console.log(validCombos);

function getComboSize(combo: Container[]) {
  return combo.reduce((acc, a) => acc + a.value, 0);
}

function isDuplicateCombo(validCombos: Container[][], currentCombo: Container[]) {
  let isDuplicate = false;
  validCombos.forEach((combo) => {
    if (combo.length == currentCombo.length) {
      if (
        combo
          .map((c) => c.id)
          .sort()
          .join(",") == currentCombo.sort((c) => c.id).join(",")
      )
        isDuplicate = true;
    }
  });

  return isDuplicate;
}

export {};
