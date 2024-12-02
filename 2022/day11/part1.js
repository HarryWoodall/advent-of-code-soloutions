const setup = require("../setup");
let input = setup.getInput("11-test");

let divider = "\r\n";
let monkeyData = input.split(`${divider}${divider}`);
let monkeys = [];

let superModulo = 9699690;

class Monkey {
  constructor(startingItems, operation, test, trueMonkey, falseMonkey) {
    this.startingItems = startingItems;
    this.operation = operation;
    this.test = test;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;

    this.itemsInspected = 0;
  }
}

for (let monkey of monkeyData) {
  let descriptions = monkey.split(divider);

  let startingItems = descriptions[1]
    .split("Starting items: ")[1]
    .split(", ")
    .map((item) => BigInt(item));
  let operation = descriptions[2].split("Operation: new = old ")[1].split(" ");
  let test = BigInt(descriptions[3].split("Test: divisible by ")[1]);
  let testTrue = BigInt(descriptions[4].split("If true: throw to monkey ")[1]);
  let testFalse = BigInt(descriptions[5].split("If false: throw to monkey ")[1]);

  monkeys.push(new Monkey(startingItems, operation, test, testTrue, testFalse));
}

for (let i = 0; i < 10000; i++) {
  for (let monkey of monkeys) {
    for (let item of monkey.startingItems) {
      let worryLevel = BigInt(item % BigInt(superModulo));
      let operationValue = monkey.operation[1] == "old" ? item : monkey.operation[1];

      worryLevel = eval(`${worryLevel} ${monkey.operation[0]} ${operationValue}`);

      monkey.itemsInspected++;
      // worryLevel = Math.floor(worryLevel / 3);

      if (BigInt(worryLevel) % BigInt(monkey.test) == 0) {
        monkeys[monkey.trueMonkey].startingItems.push(BigInt(worryLevel));
      } else {
        monkeys[monkey.falseMonkey].startingItems.push(BigInt(worryLevel));
      }
    }

    monkey.startingItems = [];
    // break;
  }
}
monkeys = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
console.log(monkeys);
console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected);
