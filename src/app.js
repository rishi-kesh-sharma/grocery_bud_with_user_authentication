const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const registerMiddleware = require("./middlewares/registerMiddleware");
const loginMiddleware = require("./middlewares/loginMiddleware");
const generateTokenMiddleware = require("./middlewares/generateTokenMiddleware");
const authorizeMiddleware = require("./middlewares/authorizeMiddleware");
const logoutMiddleware = require("./middlewares/logoutMiddleware.js");

dotenv.config();
require("./db/conn");
const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(staticPath));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

// server side rendering

app.get("/", authorizeMiddleware, (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

//post requests

app.post("/api/register", registerMiddleware);

app.post("/api/login", loginMiddleware, generateTokenMiddleware);
app.get("/api/logout", authorizeMiddleware, logoutMiddleware);

app.listen(PORT, (err) => {
  console.log("server running on port " + PORT);
});
