const p5 = require("node-p5");
const path = require("path");
const setup = require("../setup.js");
const input = setup.getInput("1");

const offset = { x: 500, y: 800 };
let currentDirecton = 0;
let orientations = ["N", "E", "S", "W"];
let scale = 10;
let currentPos = offset;

const commands = input.split(", ");

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(5000, 3000);
    p.background(255);

    for (const item of commands) {
      const dir = item[0];
      const dist = parseInt(item.slice(1));

      changeDirection(dir);
      drawLine(p, dist);
    }

    placeMarker(p, { x: 75, y: -4 });

    p.saveCanvas(canvas, path.resolve(__dirname, "visualiser"), "png")
      .then(() => {
        console.log("saved image succeessfully");
      })
      .catch(console.error);

    p.noLoop();
  };
}

function drawLine(p, distance) {
  let startPos = {
    x: currentPos.x,
    y: currentPos.y,
  };

  let endPos = { ...startPos };
  const scaledDistance = distance * scale;

  switch (orientations[currentDirecton]) {
    case "N":
      endPos.y += scaledDistance;
      break;
    case "E":
      endPos.x += scaledDistance;
      break;
    case "S":
      endPos.y -= scaledDistance;
      break;
    case "W":
      endPos.x -= scaledDistance;
      break;
  }

  if (distance > 50) {
    console.log("long distance", distance);
    console.log("new pos: ", endPos);
  }

  currentPos = endPos;

  p.line(startPos.x, startPos.y, endPos.x, endPos.y);
}

function changeDirection(direction) {
  switch (direction) {
    case "L":
      currentDirecton = mod(currentDirecton - 1, 4);
      break;
    case "R":
      currentDirecton = mod(currentDirecton + 1, 4);
      break;
  }
}

function addVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

function scaleVector(v, scale) {
  return {
    x: v.x * scale,
    y: v.y * scale,
  };
}

function placeMarker(p, vec) {
  p.stroke("red");
  p.strokeWeight(10);
  pointVector = {
    x: vec.x * scale + offset.x,
    y: vec.y * scale + offset.y,
  };

  console.log(`placing point at ${vec.x}, ${vec.y}`);
  console.log(`placing point at ${vec.x + offset.x}, ${vec.y + offset.y}`);
  console.log(pointVector);
  p.point(pointVector.x, pointVector.y);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

let p5Instance = p5.createSketch(sketch);
