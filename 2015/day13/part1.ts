const setup = require("../setup.js");
const fs = require("fs");

type HappinessData = {
  name: string;
  value: number;
};

class Person {
  name: string;
  happinessLookup: HappinessData[];

  constructor(name: string) {
    this.name = name;
    this.happinessLookup = [];
  }
}

setup.createInput("13");
let input: string = setup.getInput("13");
const lines = input.split("\n");

const people: Person[] = [
  {
    name: "_Myself",
    happinessLookup: [],
  },
];
let currentPerson: Person | undefined;

lines.forEach((line) => {
  const name = line.split(" ")[0];
  const happinesName = line.split(" ")[10];
  const happinessSign = line.split(" ")[2];
  const happinessValue = line.split(" ")[3];

  if (!currentPerson || currentPerson.name != name) {
    currentPerson = new Person(name);
    people.push(currentPerson);
    people[0].happinessLookup.push({
      name: name,
      value: 0,
    });
    currentPerson.happinessLookup.push({
      name: "_Myself",
      value: 0,
    });
  }

  currentPerson.happinessLookup.push({
    name: happinesName,
    value: parseInt(`${happinessSign == "gain" ? "" : "-"}${happinessValue}`),
  });
});

console.log(JSON.stringify(people, null, 2));

// some global variable to store the results
var result = [];
var currentHighest = -Infinity;

// currentSize should be invoked with the array size
function permutation(arr, currentSize) {
  if (currentSize == 1) {
    // recursion base-case (end)
    result.push([...arr]);
    return;
  }

  for (let i = 0; i < currentSize; i++) {
    permutation(arr, currentSize - 1);
    if (currentSize % 2 == 1) {
      let temp = arr[0];
      arr[0] = arr[currentSize - 1];
      arr[currentSize - 1] = temp;
    } else {
      let temp = arr[i];
      arr[i] = arr[currentSize - 1];
      arr[currentSize - 1] = temp;
    }
  }
}

function getPerson(name: string) {
  return people.find((person) => person.name == name);
}

function calculateHappiness(arrangement: string[]) {
  // console.log(arrangement);
  let currentHappiness = 0;
  arrangement.forEach((name, index) => {
    const person = getPerson(name);
    const leftPerson = getPerson(arrangement[(index + arrangement.length - 1) % arrangement.length]);
    const rightPerson = getPerson(arrangement[(index + arrangement.length + 1) % arrangement.length]);

    currentHappiness += person.happinessLookup.find((_) => _.name == leftPerson.name).value;
    currentHappiness += person.happinessLookup.find((_) => _.name == rightPerson.name).value;
  });

  return currentHappiness;
}

let array = people.map((item) => item.name);
permutation(array, array.length);

result.forEach((arrangement) => {
  const arrangementResult = calculateHappiness(arrangement);
  if (arrangementResult > currentHighest) {
    currentHighest = arrangementResult;
  }
});

console.log(currentHighest);
// use result here

export {};
