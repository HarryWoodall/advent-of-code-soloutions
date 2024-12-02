const setup = require("../setup.js");
const fs = require("fs");

function getInput() {
  if (fs.existsSync(`${__dirname}/../input/12.json`)) {
    return fs.readFileSync(`${__dirname}/../input/12.json`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    console.log(`Day input does not exist`);
  }
}

let input: string = getInput();
let json = JSON.parse(input);
let keys = Object.keys(json);

let sum = 0;
let actions = 0;
let level = 0;

keys.forEach((key) => {
  level++;
  console.log(addWhitespace(key));
  parseObject(json, key, []);
  level--;
});

function parseObject(object: object, key: any, path: any[]) {
  // console.log("looking at", key);
  // if (actions > 20) return;

  if (typeof object[key] == "number") {
    actions++;
    // console.log(`${object[key]}:: Sum: ${sum}, actions: ${actions}`);
    // console.log(printPath(path));
    // console.log();
    sum += object[key];
    return;
  }

  if (Array.isArray(object[key])) {
    path.push(key);
    level++;
    parseArray(object[key], path);
    level--;
    path.pop();
    return;
  }

  if (typeof object[key] == "object") {
    const keys = Object.keys(object[key]);

    keys.forEach((k) => {
      console.log(addWhitespace(k));
      path.push(k);
      level++;
      parseObject(object[key], k, path);
      level--;
      path.pop();
      console.log();
    });

    return;
  }
}

function parseArray(array: Array<any>, path: any[]) {
  // if (actions > 20) return;

  array.forEach((item) => {
    if (typeof item == "number") {
      actions++;
      // console.log(`${item}::  Sum: ${sum}, actions: ${actions}`);
      // console.log(printPath(path));
      // console.log();
      sum += item;
      return;
    }

    if (Array.isArray(item)) {
      path.push([]);
      level++;
      parseArray(item, path);
      level--;
      path.pop();
      return;
    }

    if (typeof item == "object") {
      const keys = Object.keys(item);
      keys.forEach((k) => {
        console.log(addWhitespace(k));
        path.push(k);
        level++;
        parseObject(item, k, path);
        level--;
        path.pop();
        console.log();
      });
      return;
    }
  });
}

function printPath(path: any[]) {
  path.forEach((item) => {
    console.log(item);
    // console.log(JSON.parse(item));
  });
}

function addWhitespace(string: string) {
  let output = "";
  for (let i = 0; i < level - 1; i++) {
    output += "  ";
  }

  return output + string;
}

console.log(sum);

export {};
