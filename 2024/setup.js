const fetch = require("node-fetch");
const fs = require("fs");

const cookieValue = "53616c7465645f5f41c9a0a4508a4d5e2dccab367bcdb2963b78ef7996a73ee7167eb10e0916ab98d1101c633d49b68856e64b459ec84c3470c6e6a0def9e4f6";

async function createInput(day) {
  if (!fs.existsSync(`${__dirname}/input/${day}.txt`)) {
    var headers = { Cookie: "session=" + cookieValue };
    console.log(`Attempting to fetch /${day}/input`);
    const res = await fetch(`https://adventofcode.com/2024/day/${day}/input`, { headers: headers });
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
