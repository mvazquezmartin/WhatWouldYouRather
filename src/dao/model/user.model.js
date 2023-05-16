const mongoose = require("mongoose")

const collectionName = "user"

const collectionSchema = new mongoose.Schema({
  nick_name: String,  
  email:{
    type: String,
    unique: True
  },
  password: String,
})

const Users = mongoose.model(collectionName, collectionSchema)

module.exports = Users