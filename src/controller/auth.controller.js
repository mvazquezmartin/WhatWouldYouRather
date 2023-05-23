const { Router } = require("express");
const passport = require("passport");
const UserDao = require("../dao/user.dao");
const { pwValidate } = require("../utils/cryptoPassword.util");
const { generateToken } = require("../utils/jwt.util");
const authorization = require("../middlewares/authorization.middleware");

const router = Router();
const Users = new UserDao();

//LOGIN USER
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

    const access_token = generateToken({ email, role: user.role });
    res.cookie("authToken", access_token, { httpOnly: true }).json({
      status: "success",
      message: "Session initialized",
      token: access_token,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});

//PASSPORT-GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/googlecallback",
  passport.authenticate("google", { failureRedirect: "/auth/faillogin" }),
  async (req, res) => {
    const access_token = generateToken({
      email: req.user.email,
      role: req.user.role,
    });
    res.cookie("authToken", access_token, { httpOnly: true }).json({
      status: "success",
      message: "Session initialized",
      token: access_token,
    });
  }
);

//LOGOUT
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authorization(["user", "admin"]),
  (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully" });
  }
);

router.get("/faillogin", (req, res) => {
  console.log("failed entry strategy");
  res.json({ error: "Failed login" });
});

module.exports = router;
