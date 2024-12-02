const setup = require("../setup.js");
// setup.createInput("4");
const input: string = setup.getInput("4");
const strings = input.split("\n");

type RoomData = {
  value: string[];
  sectorId: number;
};

var sectorIdSum = 0;
const validRooms: RoomData[] = [];

for (const name of strings) {
  const checkSum = name.split("[")[1].split("]")[0];
  const sectorId = parseInt(name.split("-").pop().split("[")[0]);
  let characters = name.split("-");
  characters.pop();
  const fullCharacterString = characters.join("").split("").sort();
  const calculatedChecksum = calculateChecksum(fullCharacterString);

  if (checkSum == calculatedChecksum) {
    sectorIdSum += sectorId;
    validRooms.push({
      value: characters,
      sectorId: sectorId,
    });
  }
}

const decrytedRooms: { name: string; value: number }[] = [];

for (let room of validRooms) {
  decrytedRooms.push({
    name: decryptRoom(room),
    value: room.sectorId,
  });
}

const needles = decrytedRooms.filter((_) => _.name.includes("north"));
console.log(needles);

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

function decryptRoom(room: RoomData) {
  const roomWords = [];
  for (const word of room.value) {
    let decrptedChars = [];

    for (const char of word) {
      decrptedChars.push(shiftCharacter(char, room.sectorId));
    }

    roomWords.push(decrptedChars.join(""));
  }

  return roomWords.join(" ");
}

function shiftCharacter(character: string, shiftAmmount: number) {
  const currentNumericValue = character.charCodeAt(0) - 97;
  const charCode = (currentNumericValue + shiftAmmount) % 26;
  return String.fromCharCode(charCode + 97);
}
