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

// People entries are stored in the people array, which starts out empty.
// They are not persisted.
// There is no file i/o or database access in this exercise.
const people = [];

// Routes

// adding a new people entry
// post request to the URI /api/v1/people
app.post("/api/v1/people", (req, res) => {
  // name (string) and age (number) are required

  // if no name in req.body
  if (!req.body.name) {
    // return json document with 400 result code and message
    res.status(400).json({ error: "Please enter a name." });
    return;
  }
  // if no age in req.body
  if (!req.body.age) {
    // return json document with 400 result code and message 
    res.status(400).json({ error: "Please enter an age." });
    return;
  }
  // age must be non-negative number
  const age = Number(req.body.age);
  // if age is NaN (not a number) and/or less than 0
  if (isNaN(age) || age < 0) {
    // return json document with 400 result code and message
    res.status(400).json({ error: "Please enter a valid age." })
  }
  // create entry
  req.body.age = age;
  req.body.index = people.length;
  people.push(req.body)
  // if entry is created
  // return JSON document with a message saying that "A person entry was added" along with the index of the entry just added
  res.status(201).json({ message: "A person record was added.", index: req.body.index });
})

//  retrieving the list of people entries
// get request to the URI /api/v1/people
app.get("/api/v1/people", (req, res) => {
  // JSON document containing the array
  res.json(people);
})

// retrieving a single person entry
// get request to /api/v1/people/:id
// :id is the index of the entry to be retrieved
app.get("/api/v1/people/:id", (req, res) => {
  const index = Number(req.params.id);
  // unless the index is out of range (NaN, not an integer, less than 0 or greater than the length of people array)
  if (
    isNaN(index) ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= people.length
  ) {
    // error message and a 404 result code
    res.status(404).json({ message: "Record not found." });
    return;
  }
  // return JSON document with the entry
  const person = people[index];
  res.json(person);
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports =  { app, server }