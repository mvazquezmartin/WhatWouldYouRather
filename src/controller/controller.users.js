const { Router } = require("express");
const UserDao = require("../dao/user.dao");
const { createHash } = require("../utils/cryptoPassword.util");
const { generateToken } = require("../utils/jwt.util");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");

const router = Router();
const Users = new UserDao();

router.post("/", async (req, res) => {
  try {
    const { nick_name, email, password } = req.body;
    const user = await Users.findUser(email);

    if (user) {
      console.log("User already exists");
      return res
        .status(409)
        .json({ error: "That email is already registered" });
    }

    const newUserInfo = {
      nick_name,
      email,
      password: createHash(password),
    };

    const newUser = await Users.createUser(newUserInfo);
    const access_token = generateToken({ email: newUser.email });

    res.status(201).json({
      status: "success",
      message: newUser,
      token: access_token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

//GET ALL USERS
router.get(
  "/",
  passport.authenticate("jwt"),
  authorization("admin"),
  async (req, res) => {
    try {
      const users = await Users.getAllUser();
      res.json({ status: "success", message: users });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
);

//DELETE ALL
router.delete("/deleteAllUser", async (req, res) => {
  await Users.deleteAllUser();
  res.json({ message: "Everything has gone (ಠ_ಠ)" });
});

router.get("/failregister", (req, res) => {
  console.log("Failed register");
  res.json({ error: "Failed register" });
});

module.exports = router;
