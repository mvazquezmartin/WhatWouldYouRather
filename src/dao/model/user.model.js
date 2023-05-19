const mongoose = require("mongoose");

const collectionName = "user";

const collectionSchema = new mongoose.Schema({
  nick_name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  email_name: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const Users = mongoose.model(collectionName, collectionSchema);

module.exports = Users;
