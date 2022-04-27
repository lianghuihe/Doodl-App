const mongoose = require("mongoose");
const { stringify } = require("uuid");

const doodlSchema = new mongoose.Schema({
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
  },
  date: {
    type: String,
    required: true,
  }
});

const Doodl = mongoose.model("Doodl", doodlSchema);
module.exports = Doodl;