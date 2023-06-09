const fs = require("fs");
const file = "src/file/DilemmaFile.json";

class DilemmaManager {
  constructor() {
    this.dilemmas = [];
  }

  async getAllDilemmas() {
    try {
      await this.readFile();
      return this.dilemmas;
    } catch (error) {
     console.log("Error in DilemmaManager getAllDilemmas");
      throw error;
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      if (data) this.dilemmas = JSON.parse(data);
    } catch (error) {
      console.log("Error in DilemmaManager readFile");
      throw error;
    }
  }
}

module.exports = DilemmaManager;
