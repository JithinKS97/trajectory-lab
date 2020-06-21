const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
var bodyParser = require("body-parser");
var node = require("./ipfs");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const getRandomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const systems = {};

app.post("/save-system", function (req, res) {
  node.saveData();
  const id = getRandomString();
  systems[id] = req.body;
  res.send({
    message: "Successfully saved",
    id: id,
  });
});

app.post("/load-system", function (req, res) {
  const system = systems[req.body.id] || { message: "Not found" };
  res.send({
    system,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
