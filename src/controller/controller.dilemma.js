const { Router } = require("express");

const router = Router()

router.get("/", async(req, res)=>{
  try{
    res.json({message: "CHECK"})
  }catch(error){
    console.log(error)
  }
})

module.exports = router