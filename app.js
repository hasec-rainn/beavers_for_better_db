/*
    SETUP for a simple webapp
*/
// Express
var fs = require("fs");
var express = require("express"); // We are using the express library for the web server
var exphbs = require("express-handlebars");
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = process.env.PORT || 4221; // Set a port number at the top so it's easy to change in the future
// Database
var db = require("./db-connector");
var employeeData = require("./json/employeeData.json");
var roleData = require("./json/roleData.json");
var salaryData = require("./json/salaryData.json");
var projectData = require("./json/projectData.json");
var employeesProjectsData = require("./json/employeesProjectsData.json");
var mainDir = require("./json/mainDir.json");
//Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use("/public", express.static("./public/"));
/*
    ROUTES
*/
app.get("/", function (req, res) {
  res.status(200).render("mainPage", { mainDirData: mainDir });
});

app.post("/addEmployeeData", function (req, res, next) {
  employeeData.push({
    ID: req.body.ID,
    Hiredate: req.body.Hiredate,
    Name: req.body.Name,
    Role: req.body.Role,
    Active: req.body.Active,
    Address: req.body.Address,
    Birthdate: req.body.Birthdate,
  });

  fs.writeFile(
    "./json/employeeData.json",
    JSON.stringify(employeeData, null, 2),
    function (err) {
      if (err) {
        res.status(500).send("Failed to store employee.");
      } else {
        res.status(200).send("Employee successfully stored.");
      }
    }
  );
});

app.post("/removeEmployeeData", function (req, res, next) {
  // console.log(req.body.index)
  employeeData.splice(parseInt(req.body.index), 1);

  fs.writeFile(
    "./json/employeeData.json",
    JSON.stringify(employeeData, null, 2),
    function (err) {
      if (err) {
        res.status(500).send("Failed to delete employee.");
      } else {
        res.status(200).send("Employee successfully deleted.");
      }
    }
  );
});

app.post("/editEmployeeData", function (req, res, next) {
  console.log(req.body.index);
  employeeData[req.body.index][req.body.key] = req.body.newString;

  fs.writeFile(
    "./json/employeeData.json",
    JSON.stringify(employeeData, null, 2),
    function (err) {
      if (err) {
        res.status(500).send("Failed to delete employee.");
      } else {
        res.status(200).send("Employee successfully deleted.");
      }
    }
  );
});

app.get("/employee*-project*", function (req, res) {
  res.status(200).render("employeesProjects", {
    employeesProjectsData: employeesProjectsData,
  });
});

app.get("/*employee*", function (req, res) {
  res.status(200).render("employee", { employeeData: employeeData });
});

app.get("/*project*", function (req, res) {
  res.status(200).render("project", { projectData: projectData });
});

app.get("/*salary", function (req, res) {
  res.status(200).render("salary", { salaryData: salaryData });
});

app.get("/*role*", function (req, res) {
  res.status(200).render("role", { roleData: roleData });
});

app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(PORT, function (err) {
  if (err) throw err;
  console.log("== Server is listening on port", PORT);
});
