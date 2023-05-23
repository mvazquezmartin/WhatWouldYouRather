const dilemmaController = require("../controller/dilemma.controller");
const authController = require("../controller/auth.controller");
const userController = require("../controller/users.controller");
const homeDilemmaController = require("../controller/homeDilemma.controller");
const loginController = require("../controller/login.controller");
const singupController = require("../controller/singup.controller");

const router = (app) => {
  app.use("/api/dilemma", dilemmaController);
  app.use("/login", loginController);
  app.use("/singup", singupController);
  app.use("/auth", authController);
  app.use("/users", userController);
  app.use("/dilemma", homeDilemmaController);
  app.use("*", (req, res) => {
    res.json({ message: "Not Found" });
  });
};

module.exports = router;
