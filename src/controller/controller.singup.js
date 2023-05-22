const { Router } = require("express");
const router = Router()

router.get("/", (req, res)=>{
  res.render("singup.handlebars")
})

module.exports = router
