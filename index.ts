import readline from "readline";
import { exec, execSync } from "child_process";
import fs from "fs";

let previousCommand = "";

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
  console.log();
  if (command == "" && previousCommand) {
    command = previousCommand;
  }

  if (command == "") return;

  previousCommand = command;
  const year = command.split("/")[0];
  const day = command.split("/")[1];
  const part = command.split("/")[2];

  if (!year || !day || !part) {
    console.log("invalid command");
    return;
  }

  if (!fs.existsSync(`${year}/day${day}`)) {
    console.log("directory not found");
    return;
  }

  if (!(part == "1" || part == "2")) {
    console.log("invalid part");
    return;
  }

  const fileToExec = fs.readdirSync(`${year}/day${day}`)[parseInt(part) - 1] || null;

  if (!fileToExec) {
    console.log("file not found");
    return;
  }

  const fileType = fileToExec.split(".")[1];

  try {
    if (fileType == "js") {
      const result = execSync(`node ${year}/day${day}/${fileToExec}`).toString();
      console.log(result);
    } else if (fileType == "ts") {
      const result = execSync(`ts-node ${year}/day${day}/${fileToExec}`).toString();
      console.log(result);
    } else {
      console.log("filetype not runnable");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

const start = async () => {
  while (true) {
    if (previousCommand) {
      await askQuestion(`file to run (${previousCommand}): `);
    }
    await askQuestion("file to run: ");
  }
};

start();
