const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const { stringify } = require("uuid");

const reportSchema = new mongoose.Schema({
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
  desc: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;