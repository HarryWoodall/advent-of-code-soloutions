const fs = require("fs");

// const setup = require("../setup");
// let input = setup.getInput("7-test");

let input = getInput("7");
let commands = input.split("\n");

let result = 0;
let dirs = [];

function getInput(day) {
  if (fs.existsSync(`${__dirname}/../input/${day}.txt`)) {
    return fs.readFileSync(`${__dirname}/../input/${day}.txt`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    console.log(`Day ${day} input does not exist`);
  }
}

class Directory {
  constructor(name, previousDirectory = null) {
    this.name = name;
    this.previousDirectory = previousDirectory;
  }

  size = 0;
  name = "";
  previousDirectory = null;
  files = [];
  directories = [];

  calcSize() {
    if (this.directories.length == 0) {
      if (this.size < 100000) result += this.size;
      return this.size;
    }

    for (let directory of this.directories) {
      this.size += directory.calcSize();
    }

    if (this.size < 100000) result += this.size;
    return this.size;
  }

  availableDirs(spaceNeeded) {
    for (let directory of this.directories) {
      directory.availableDirs(spaceNeeded);
    }

    if (this.size >= spaceNeeded) dirs.push(this);
  }

  getFileSize() {
    let size = 0;
    for (let file of this.files) {
      size += parseInt(file.size);
    }

    return size;
  }

  print(spaces) {
    this.printLine(`DIR ${this.name}, FILES SIZE: ${this.getFileSize()} TOTAL SIZE: ${this.size}`, spaces);

    for (let dir of this.directories) {
      dir.print(spaces + 1);
    }

    for (let file of this.files) {
      this.printLine(`${file.name} ${file.size}`, spaces + 1);
    }
  }

  printLine(string, spaces) {
    let line = "";
    for (let i = 0; i < spaces; i++) {
      line += "-";
    }
    line += string;
    console.log(line);
  }
}

class File {
  constructor(name, directory, size) {
    this.name = name;
    this.directory = directory;
    this.size = size;

    directory.size += parseInt(size);
  }
}

let root = new Directory("/");
let currentDirectory = root;
let attributes;

for (let i = 0; i < commands.length; i++) {
  attributes = commands[i].split(" ");

  if (attributes[0] == "$") {
    command = attributes[1];
    switch (command) {
      case "cd":
        if (attributes[2] == "/") currentDirectory = root;
        else if (attributes[2] == "..") currentDirectory = currentDirectory.previousDirectory;
        else currentDirectory = currentDirectory.directories.find((dir) => dir.name == attributes[2]);
        break;
      case "ls":
        i++;
        attributes = commands[i].split(" ");
        let getOutClaus = 0;
        while (attributes[0] != "$") {
          if (getOutClaus > 100) break;
          getOutClaus++;

          if (attributes[0] == "dir") {
            const directory = new Directory(attributes[1], currentDirectory);
            currentDirectory.directories.push(directory);
          } else {
            const file = new File(attributes[1], currentDirectory, attributes[0]);
            currentDirectory.files.push(file);
          }

          i++;
          if (i < commands.length) attributes = commands[i].split(" ");
          else break;
        }
        i--;
        break;
    }
  }
}

root.calcSize();
// root.print(0);
console.log(`Root size: ${root.size}`);
console.log(`space free = ${70000000 - root.size}`);
console.log(`space needed = ${30000000 - (70000000 - root.size)}`);
root.availableDirs(30000000 - (70000000 - root.size));
console.log(dirs.sort((a, b) => a.size - b.size));
