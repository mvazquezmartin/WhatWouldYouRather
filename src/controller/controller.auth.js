const { Router } = require("express");
const passport = require("passport");
const UserDao = require("../dao/user.dao");
const { pwValidate } = require("../utils/cryptoPassword.util");
const { generateToken } = require("../utils/jwt.util");

const router = Router();
const Users = new UserDao();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findUser(email);

    if (!user)
      return res.status(400).json({
        status: "Error",
        error: "Username and password don't match",
      });

    if (!pwValidate(password, user))
      return res.status(201).json({
        status: "Error",
        message: "Username and password don't match",
      });

    const access_token = generateToken({ email });
    res
      .cookie("authToken", access_token, { maxAge: 60000, httpOnly: true })
      .json({ status: "success", message: "Session initialized", token:access_token });
  } catch (error) {
    res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/auto/faillogin" }),
  async (req, res) => {}
);

router.get("/logout", (req, res) => {});

router.get("/faillogin", (req, res) => {
  console.log("failed entry strategy");
  res.json({ error: "Failed login" });
});

module.exports = router;
