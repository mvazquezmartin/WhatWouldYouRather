const dilemmaController = require("../controller/controller.dilemma");
const authController = require("../controller/controller.auth");
const userController = require("../controller/controller.users");

const router = (app) => {
  app.use("/api/dilemma", dilemmaController);
  app.use("/auth", authController);
  app.use("/users", userController);
};

module.exports = router;
