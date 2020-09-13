const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
var hbs = require("express-handlebars");

const app = express();

// CORS config
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET"],
    allowedHeaders: ["Accept", "Content-Type"],
  })
);

// set view engine as html
app.engine("handlebars", hbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// security headers middleware
app.use(helmet());

// request body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// HTTP request logger middleware
app.use(morgan("dev"));

// compacting requests using GZIP middleware
app.use(compression());

// import Routes
require("../routes")(app);

module.exports = app;
