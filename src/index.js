const express = require("express");
const { PORT } = require("./config/app.config");
const router = require("./router");
const mongoConnect = require("../db");
const initializePassport = require("./config/passport.config");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
initializePassport();
app.use(passport.initialize());

mongoConnect();
router(app);

app.listen(PORT, () => {
  console.log(`Server initialized on PORT:${PORT} `);
});
