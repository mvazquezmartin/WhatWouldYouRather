const dilemmaController = require("../controller/controller.dilemma")

const router = (app) =>{
  app.use("/api/dilemma", dilemmaController)
}

module.exports = router