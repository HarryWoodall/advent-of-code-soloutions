const fetch = require("node-fetch");
const fs = require("fs");

const cookieValue = "53616c7465645f5f77cfce3a9d42e396b723448ef02efb9817b1f17f35c845fe05d75e3c17bf367ab816639070659f6f6696142db3d617cff1bb560ff5db516b";

async function createInput(day) {
  if (!fs.existsSync(`${__dirname}/input/${day}.txt`)) {
    var headers = { Cookie: "session=" + cookieValue };
    console.log(`Attempting to fetch /${day}/input`);
    const res = await fetch(`https://adventofcode.com/2016/day/${day}/input`, { headers: headers });
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
