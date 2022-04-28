const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const { stringify } = require("uuid");

const likeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  doodlID: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});

const Doodl = mongoose.model("like", likeSchema);
module.exports = Doodl;