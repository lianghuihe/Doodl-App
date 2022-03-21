const express = require("express");
const models = require("./models");
const app = express();

/*
app.post("/add_user", async (req, res) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/users", async (req, res) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

*/

app.get("/gallery", function (req, res) {
    res.json("gallery");
});


module.exports = app;