const { Router } = require("express");
const DilemmaDao = require("../dao/dilemma.dao");
const passport = require("passport");
const authorization = require("../middlewares/authorization.middleware");

const router = Router();
const Dilemmas = new DilemmaDao();

//GET DILEMMA
router.get("/", async (req, res) => {
  try {
    const dilemma = await Dilemmas.getRandomDilemma();
    res.json(dilemma[0]);
  } catch (error) {
    console.log(error);
  }
});

//ADD COUNTER OPT & PERCENTAGE
router.put("/:id/:opt", async (req, res) => {
  try {
    const dilemma = await Dilemmas.findDilemmaById(req.params.id);
    if (!dilemma) return res.status(404).json({ error: "Dilemma not found" });

    const option = req.params.opt;
    dilemma.vote(option);
    await dilemma.save();

    const opt1Percentage = Math.floor(dilemma.opt1Percentage);
    const opt2Percentage = Math.floor(dilemma.opt2Percentage);
    const dilemmaVotes = dilemma.totalVotes + 100;

    res.json({ dilemmaVotes, opt1Percentage, opt2Percentage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//ADD DILEMMA PRIVATE ROUTE USER
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorization("user"),
  async (req, res) => {
    try {
      const { opt1, opt2 } = req.body;
      const newDilemmaInfo = { opt1, opt2 };

      const newDilemma = await Dilemmas.addDilemma(newDilemmaInfo);
      res.status(201).json({
        message: "Dilemma successfully added",
        opt1: newDilemma.opt1,
        opt2: newDilemma.opt2,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
//GET ALL DILEMMAS ADMIN
router.get(
  "/alldilemmas",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      const dilemmas = await Dilemmas.getAllDilemmas();
      res.json({ status: "success", message: dilemmas });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

//DELETE ALL ONLY DEV
router.delete(
  "/deleteall",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    await Dilemmas.deleteAllDilemmaForDevs();
    res.json({ message: "Everything has gone (ಠ_ಠ)" });
  }
);

//ADD MANY ONLY DEV
router.put(
  "/addmany",
  passport.authenticate("jwt", { session: false }),
  authorization("admin"),
  async (req, res) => {
    try {
      await Dilemmas.addManyDilemma();
      res.status(201).json({ message: "Dilemmas successfully added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
