const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});

db.on("open", () => {
    console.log("Connected to DB!");
});

 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
 });  

app.use(morgan("tiny"));

// for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.forEach((item) => app.use(item.path, item.router));

app.use('/uploads', express.static('uploads'));

// Running server
app.listen(3001, () => {
    console.log("Server listening on port 3001");
})