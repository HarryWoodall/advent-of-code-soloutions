const setup = require("../setup.js");

// setup.createInput("6");
const input: string = setup.getInput("6");
const lines = input.split("\n");
const commands: Command[] = [];
const lights: Light[] = [];

type Ord = {
  x: number;
  y: number;
};
type Command = {
  action: string;
  start: Ord;
  end: Ord;
};
type Light = {
  brightness: number;
  location: Ord;
};

for (let y = 0; y < 1000; y++) {
  for (let x = 0; x < 1000; x++) {
    lights.push({
      brightness: 0,
      location: {
        x: x,
        y: y,
      },
    });
  }
}

lines.forEach((line) => {
  const command = parseLine(line);
  commands.push(command);
});

commands.forEach((command) => executeCommand(command));
console.log(lights.map((light) => light.brightness).reduce((acc, a) => acc + a, 0));

function parseLine(line: string): Command {
  const words = line.split(" ");
  if (words[0] == "turn") {
    return {
      action: `${words[0]} ${words[1]}`,
      start: {
        x: parseInt(words[2].split(",")[0]),
        y: parseInt(words[2].split(",")[1]),
      },
      end: {
        x: parseInt(words[4].split(",")[0]),
        y: parseInt(words[4].split(",")[1]),
      },
    };
  } else {
    return {
      action: words[0],
      start: {
        x: parseInt(words[1].split(",")[0]),
        y: parseInt(words[1].split(",")[1]),
      },
      end: {
        x: parseInt(words[3].split(",")[0]),
        y: parseInt(words[3].split(",")[1]),
      },
    };
  }
}

function getLights(start: Ord, end: Ord) {
  return lights.filter((light) => {
    return light.location.x >= start.x && light.location.x <= end.x && light.location.y >= start.y && light.location.y <= end.y;
  });
}

function executeCommand(command: Command) {
  const lightsInRange = getLights(command.start, command.end);

  switch (command.action) {
    case "turn on":
      lightsInRange.forEach((light) => (light.brightness += 1));
      break;
    case "turn off":
      lightsInRange.forEach((light) => (light.brightness = Math.max(0, light.brightness - 1)));
      break;
    case "toggle":
      lightsInRange.forEach((light) => (light.brightness += 2));
      break;
  }
}

export {};
