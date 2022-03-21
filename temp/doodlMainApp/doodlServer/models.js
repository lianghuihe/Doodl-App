const { json } = require("express/lib/response");
const mongoose = require("mongoose");

const SubmitionSchema = new mongoose.Schema({
  imageID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const ReportSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: true,
    },
    imageID: {
        type: String,
        required: true,
    },
    report: {
      type: String,
      default: "",
    },
  });

  const LikeSchema = new mongoose.Schema({
    userID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imageID: {
        type: String,
        required: true,
    },
  });

const User = mongoose.model("User", UserSchema);
const Submition = mongoose.model("Submition", SubmitionSchema);
const Report = mongoose.model("Report", ReportSchema);
const Like = mongoose.model("Like", LikeSchema);

module.exports = User;
module.exports = Submition;
module.exports = Report;
module.exports = Like;