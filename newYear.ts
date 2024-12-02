import readline from "readline";
import { exec, execSync } from "child_process";
import fs from "fs";

let loop = true;

function askQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans: string) => {
      rl.close();
      runCommand(ans);
      resolve(ans);
    })
  );
}

function runCommand(command: string) {
  const year = command;
  const yearRegex = /2\d{3}/;

  if (!year.match(yearRegex)) {
    console.log("invalid year");
    return;
  }

  const dir = `${year}`;

  if (fs.existsSync(dir)) {
    console.log("directory already there");
    return;
  }

  console.log(`creating /${dir}...`);

  fs.mkdirSync(dir);

  for (let i = 1; i <= 25; i++) {
    const folderName = `day${i}`;
    const initialCode = `const setup = require("../setup.js");
setup.createInput("${i}");
const input: string = setup.getInput("${i}");`;

    fs.mkdirSync(`${dir}/${folderName}`);
    fs.writeFileSync(`${dir}/${folderName}/part1.ts`, initialCode);
    fs.writeFileSync(`${dir}/${folderName}/part2.ts`, initialCode);
  }

  console.log(`creating setup file...`);

  fs.mkdirSync(`${dir}/input`);
  fs.copyFileSync(`templates/setup.js`, `${dir}/setup.js`);

  console.log(`done.`);

  loop = false;
}

const start = async () => {
  while (loop) {
    await askQuestion(`year: `);
  }
};

start();
