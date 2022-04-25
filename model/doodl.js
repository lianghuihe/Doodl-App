const mongoose = require("mongoose");
const { stringify } = require("uuid");

const doodlSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  doodl: {
    type: JSON,
    required: true,
  },
  prompt: {
    type: String,
  }
});

const Doodl = mongoose.model("Doodl", doodlSchema);
module.exports = Doodl;