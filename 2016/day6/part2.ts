const setup = require("../setup.js");
// setup.createInput("6");
const input: string = setup.getInput("6");

const lines = input.split("\n");

type CharacterFrequency = {
  char: string;
  value: number;
};

type CharMap = {
  index: number;
  characterFrequency: CharacterFrequency[];
};

const data: CharMap[] = [];

for (const line of lines) {
  const chars = line.split("");

  for (let i = 0; i < chars.length; i++) {
    let charMap: CharMap | undefined = getCharMap(i);
    if (!charMap) {
      charMap = {
        index: i,
        characterFrequency: [],
      };

      data.push(charMap);
    }

    const frequencyObject = getFrequencyObject(chars[i], charMap.characterFrequency);

    if (!frequencyObject) {
      charMap.characterFrequency.push({
        char: chars[i],
        value: 1,
      });
    } else {
      frequencyObject.value++;
    }
  }
}

for (const item of data) {
  item.characterFrequency.sort((a, b) => a.value - b.value);
}
console.log(JSON.stringify(data, null, 2));
console.log(getHighestFrequency().join(""));

function getCharMap(index) {
  return data.find((c) => c.index == index);
}

function getFrequencyObject(char: string, frequencyMap: CharacterFrequency[]) {
  return frequencyMap.find((x) => x.char == char);
}

function getHighestFrequency() {
  const items = [];
  for (const x of data) {
    items.push(x.characterFrequency[0].char);
  }

  return items;
}
