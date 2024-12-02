const fetch = require("node-fetch");
const fs = require("fs");

const cookieValue = "53616c7465645f5f0cfd329c1b9da036d59c8ecc4d1080e75822e25058c5112b69801c92e808750ef17df9b9e0a3f8b11f77d0373dcb6d3490242545241d65c4";

async function createInput(day) {
  if (!fs.existsSync(`${__dirname}/input/${day}.txt`)) {
    var headers = { Cookie: "session=" + cookieValue };
    console.log(`Attempting to fetch /${day}/input`);
    const res = await fetch(`https://adventofcode.com/2022/day/${day}/input`, { headers: headers });
    const text = await res.text();

    if (
      text !=
      "Please don't repeatedly request this endpoint before it unlocks! The calendar countdown is synchronized with the server time; the link will be enabled on the calendar the instant this puzzle becomes available."
    ) {
      fs.writeFileSync(`${__dirname}/input/${day}.txt`, text, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Input downloaded successfully");
      });
    }
  } else {
    console.log(`Day ${day} input already exists\n`);
  }
}

function getInput(day) {
  if (fs.existsSync(`${__dirname}/input/${day}.txt`)) {
    return fs.readFileSync(`${__dirname}/input/${day}.txt`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    console.log(`Day ${day} input does not exist`);
  }
}

module.exports = {
  createInput: createInput,
  getInput: getInput,
};
