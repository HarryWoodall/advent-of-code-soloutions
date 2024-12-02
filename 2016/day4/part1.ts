const setup = require("../setup.js");
// setup.createInput("4");
const input: string = setup.getInput("4");
const strings = input.split("\n");

var sectorIdSum = 0;

for (const name of strings) {
  const checkSum = name.split("[")[1].split("]")[0];
  const sectorId = parseInt(name.split("-").pop().split("[")[0]);
  let characters = name.split("-");
  characters.pop();
  characters = characters.join("").split("").sort();
  const calculatedChecksum = calculateChecksum(characters);

  console.log("sector id", sectorId);
  console.log("check sum", checkSum);
  console.log("characterMap", calculatedChecksum);

  if (checkSum == calculatedChecksum) {
    sectorIdSum += sectorId;
  }
}

console.log(sectorIdSum);

function calculateChecksum(characters: string[]) {
  type CharacterMap = {
    character: string;
    value: number;
  };
  const characterMap: CharacterMap[] = [];

  for (const char of characters) {
    if (!characterMap.some((c) => c.character == char)) {
      characterMap.push({
        character: char,
        value: 1,
      });
    } else {
      const charObject = characterMap.find((c) => c.character == char);
      charObject.value += 1;
    }
  }

  return characterMap
    .sort((a, b) => b.value - a.value)
    .map((m) => m.character)
    .slice(0, 5)
    .join("");
}
