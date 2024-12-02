const p5 = require("node-p5");
const path = require("path");
const setup = require("../setup.js");
const input = setup.getInput("1");

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(5000, 3000);
    p.background(255);

    placeMarker(p, { x: 75, y: -4 });

    p.saveCanvas(canvas, path.resolve(__dirname, "visualiser"), "png")
      .then(() => {
        console.log("saved image succeessfully");
      })
      .catch(console.error);

    p.noLoop();
  };
}
