const fetch = require("node-fetch");
const fs = require("fs");

const cookieValue = "53616c7465645f5f6cb306ddaa9b37857cfd66592d034a6bc58343a03651014721a0f59d457681a89bbee7893fbbb556a9f26ea82457b5501961f9d73727d35e";

async function createInput(day) {
  if (!fs.existsSync(`${__dirname}/input/${day}.txt`)) {
    var headers = { Cookie: "session=" + cookieValue };
    console.log(`Attempting to fetch /${day}/input`);
    const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, { headers: headers });
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
