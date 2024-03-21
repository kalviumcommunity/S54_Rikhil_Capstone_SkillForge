const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
require("dotenv").config({ path: "../.env" });

userRouter.use(express.json());

const validateUser = (req, res, next) => {
  let { error } = userValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

userRouter.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    let newUserData = new User(req.body);
    let findUser = await User.find({ username: req.body.username });
    if (findUser.length == 0) {
      await newUserData.save();
      let token = jwt.sign(
        { username: req.body.username },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Username Exists");
    }
  })
);

userRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = userRouter;
