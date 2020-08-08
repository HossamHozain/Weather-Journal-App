// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

app.get("/getData", (req, res) => {
  // Send projectData as response
  res.send(projectData);
});

app.post("/postData", (req, res) => {
  // saving the data in the variable
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  console.log(projectData);
  res.send({
    sucess: true,
    message: "Data saved successfully",
    data: projectData,
  });
});

// Setup Server
const port = 5000;
const hostname = "localhost";
const server = app.listen(port, listening);
function listening() {
  console.log(`server runing on localhost:${port}`);
}
