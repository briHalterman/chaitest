const puppeteer = require("puppeteer");
require("dotenv").config();
const chai = require("chai");
const { server } = require("../app");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

chai.should();

// most of the tests are not implemented -- there are empty functions
// test examples show how to do puppeteer testing
// complete the tests -- functions that begin with "it"
// write code to interact with the browser automatically
// You can fill out fields and press buttons and then check the contents of the HTML document returned. 
// Fields and buttons are specified using CSS selectors. 
// There are a lot of async calls, and a sleep function has been provided so that the test waits a little bit for the page to update.
// tip: Mocha will often complain and throw strange errors if you do not end JavaScript statements with a semicolon.

(async () => {
  describe("Functional Tests with Puppeteer", function () {
    let browser = null;
    let page = null;
    before(async function () {
      this.timeout(5000);
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto("http://localhost:3000");
    });
    after(async function () {
      this.timeout(5000);
      await browser.close();
      server.close();
      return;
    });
    describe("got to site", function () {
      it("should have completed a connection", function (done) {
        done();
      });
    });
    describe("people form", function () {
      this.timeout(5000);
      it("should have various elements", async function () {
        this.nameField = await page.$("input[name=name]");
        this.nameField.should.not.equal(null);
        this.ageField = await page.$("input[name=age]");
        this.ageField.should.not.equal(null);
        this.resultHandle = await page.$("#result");
        this.resultHandle.should.not.equal(null);
        this.addPerson = await page.$("#addPerson");
        this.addPerson.should.not.equal(null);
        this.personIndex = await page.$("#index");
        this.personIndex.should.not.equal(null);
        this.getPerson = await page.$("#getPerson");
        this.getPerson.should.not.equal(null);
        this.listPeople = await page.$("#listPeople");
        this.listPeople.should.not.equal(null);
      });
      it("should create a person record given name and age", async function () {
        await this.nameField.type("Freya");
        await this.ageField.type("10");
        await this.addPerson.click();
        await sleep(200);
        const resultData = await (
          await this.resultHandle.getProperty("textContent")
        ).jsonValue();
        console.log("at 1, resultData is ", resultData);
        resultData.should.include("A person record was added");
        const { index } = JSON.parse(resultData);
        this.lastIndex = index;
      });
      it("should not create a person record without an age", async function () {
        // your code goes here.  
        // Hint: to clear the age field, you need the line:
          // await page.$eval("#age", (el) => (el.value = ""));
      });
      it("should return the entries just created", async function () {
         // your code goes here
      });
      it("should return the last entry.", async function () {
         // your code goes here
      });
    });
  });
})();
