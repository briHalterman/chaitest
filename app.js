// The application does not work at present because the routes for each of these operations have not been implemented.

// new packages that are used in testing, installed as dev dependencies:
  // - mocha
  // - chai
  // - chai-http
  // - puppeteer

const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];


app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});
