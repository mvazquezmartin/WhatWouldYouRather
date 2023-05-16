const mongoose = require("mongoose");

const collectionName = "dilemmas";

const collectionSchema = new mongoose.Schema({
  opt1: {
    type: String,
    require: true,
  },
  opt2: {
    type: String,
    require: true,
  },
  opt1Count: {
    type: Number,
    default: 0,
  },
  opt2Count: {
    type: Number,
    default: 0,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
});

collectionSchema.methods.vote = function (option) {
  if (option === "opt1") {
    this.opt1Count++;
  } else {
    this.opt2Count++;
  }
  this.totalVotes++;
};

collectionSchema.virtual("opt1Percentage").get(function () {
  if (this.totalVotes === 0) return 0;
  return (this.opt1Count / this.totalVotes) * 100;
});

collectionSchema.virtual("opt2Percentage").get(function () {
  if (this.totalVotes === 0) return 0;
  return (this.opt2Count / this.totalVotes) * 100;
});

const Dilemma = mongoose.model(collectionName, collectionSchema);

module.exports = Dilemma;
