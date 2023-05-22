const dilemmaController = require("../controller/controller.dilemma");
const authController = require("../controller/controller.auth");
const userController = require("../controller/controller.users");
const homeDilemmaController = require("../controller/controller.homeDilemma");
const loginController = require("../controller/controller.login");
const singupController = require("../controller/controller.singup");

const router = (app) => {
  app.use("/dilemma", homeDilemmaController);
  app.use("/login", loginController);
  app.use("/singup", singupController);
  app.use("/api/dilemma", dilemmaController);
  app.use("/auth", authController);
  app.use("/users", userController);
};

module.exports = router;
