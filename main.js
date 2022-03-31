const express = require('express');
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
const multer = require('multer');

const upload = multer();



mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});

db.on("open", () => {
    console.log("Connected to DB!");
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use("uploads", express.static("uploads"));

// Posts urls
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Categories urls
const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);

// Running server
app.listen(3001, () => {
    console.log("started!");
})