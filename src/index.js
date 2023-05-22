const express = require("express");
const handlebars = require("express-handlebars");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const router = require("./router");
const mongoConnect = require("../db");
const initializePassport = require("./config/passport.config");
const { PORT } = require("./config/app.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

mongoConnect();
router(app);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`Server initialized on PORT:${PORT} `);
});
