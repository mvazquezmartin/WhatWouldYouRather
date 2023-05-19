const DilemmaManager = require("../file/DilemmaFileManager");
const Dilemma = require("./model/dilema.model");

const dilemaManager = new DilemmaManager();

class DilemmaDao {
  async getRandomDilemma() {
    try {
      const dilemma = await Dilemma.aggregate([
        { $sample: { size: 1 } },
        { $project: { _id: 1, opt1: 1, opt2: 1 } },
      ]);
      return dilemma;
    } catch (error) {
      console.log("Error in DilemmaDao getRandomDilemma");
      throw error;
    }
  }

  async findDilemmaById(id) {
    try {
      const dilemma = await Dilemma.findById(id);
      return dilemma;
    } catch (error) {
      console.log("Error in DilemmaDao findDilemmaById");
      throw error;
    }
  }

  async addDilemma(dilemma) {
    try {
      const newDilemma = await Dilemma.create(dilemma);
      return newDilemma;
    } catch (error) {
      console.log("Error in DilemmaDao addDilemma");
      throw error;
    }
  }

  async addManyDilemma() {
    try {
      const fileDilemma = await dilemaManager.getAllDilemmas();
      const addDilemmas = await Dilemma.insertMany(fileDilemma);
      return addDilemmas;
    } catch (error) {
      console.log("Error in DilemmaDao addManyDilemma");
      throw error;
    }
  }

  async deleteAllDilemmaForDevs() {
    await Dilemma.deleteMany();
    console.log("Everything has gone (ಠ_ಠ)");
  }
}

module.exports = DilemmaDao;
