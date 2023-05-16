const { Router } = require("express");
const DilemmaDao = require("../dao/dilemma.dao");

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
    const dilemmaVotes = dilemma.totalVotes;

    res.json({ dilemmaVotes, opt1Percentage, opt2Percentage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//ADD DILEMMA PRIVATE ROUTE
router.post("/", async (req, res) => {
  try {
    const { opt1, opt2 } = req.body;
    const newDilemmaInfo = { opt1, opt2 };

    const newDilemma = await Dilemmas.create(newDilemmaInfo);
    res.status(201).json({
      message: "Dilemma successfully added",
      opt1: newDilemma.opt1,
      opt2: newDilemma.opt2,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something wnet wrong" });
  }
});

//DELETE ALL ONLY DEV
router.delete("/deleteall", async (req, res) => {
  await Dilemmas.deleteAllDilemmaForDevs();
  res.json({ message: "Everything has gone (ಠ_ಠ)" });
});

//ADD MANY ONLY DEV
router.put("/addmany", async (req, res) => {
  try {
    await Dilemmas.addManyDilemma();
    res.status(201).json({ message: "Dilemmas successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
