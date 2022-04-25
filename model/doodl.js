const mongoose = require("mongoose");
const { stringify } = require("uuid");

const doodlSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    auto: true,
  },
  email: {
    type: String,
    required: true,
  },
  doodl: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
  }
});

const Doodl = mongoose.model("Doodl", doodlSchema);
module.exports = Doodl;