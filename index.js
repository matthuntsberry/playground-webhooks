const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi buddy");
});

app.get("/travis", async (req, res) => {
  const url = `https://api.travis-ci.com/user`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "API Explorer",
        "Travis-API-Version": "3",
        Authorization: `token ${process.env.TRAVIS_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const content = await response.json();
    res.status(200).send(content);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
