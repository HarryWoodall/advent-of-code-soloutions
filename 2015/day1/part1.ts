const setup = require("../setup.js");

setup.createInput("1");
const input: string = setup.getInput("1");

const accend = input.split("").filter((item) => item == ")");
const decend = input.split("").filter((item) => item == "(");

console.log(accend.length);
console.log(decend.length);

console.log(accend.length - decend.length);

export {};
