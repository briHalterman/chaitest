document.addEventListener("DOMContentLoaded", () => {
  const addPerson = document.getElementById("addPerson");
  const getPerson = document.getElementById("getPerson");
  const listPeople = document.getElementById("listPeople");
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const index = document.getElementById("index");
  const result = document.getElementById("result");

  // add an entry to an array of people
  addPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      // send post request to URI /api/v1/people where body of request is json document containing name (string) and age (number)
      const response = await fetch("/api/v1/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // each entry must have a name and an age
        body: JSON.stringify({ name: name.value, age: Number(age.value) }), // age must be non-negative
      });
      const data = await response.json();
      // return JSON document with a message saying that "A person entry was added" along with the index of the entry just added
      result.textContent = JSON.stringify(data);
    } catch (err) {
      // return JSON document with an error message with a 400 result code
      result.textContent = err.message;
    }
  });

  // retrieve the array of people
  listPeople.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      // get request to the URI /api/v1/people
      const response = await fetch("/api/v1/people", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // return JSON document containing the array
      result.textContent = JSON.stringify(data);
    } catch (err) {
      result.textContent = err.message;
    }
  });

  // retrieve a specific entry for the array of people
  getPerson.addEventListener("click", async (event) => {
    event.preventDefault();
    const index1 = encodeURIComponent(index.value);
    console.log("index 1 is ", index1);
    try {
      // get request to /api/v1/people/:id
      // :id is index of entry to be retrieved
      const response = await fetch(`/api/v1/people/${index1}`, { 
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // return JSON document with the entry
      result.textContent = JSON.stringify(data);
    } catch (err) {
      // return error message and a 404 result code
      result.textContent = err.message;
    }
  });
});

