const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
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
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newUserData = new User({
      name: req.body.name,
      username: req.body.username,
      institution: req.body.institution,
      password: hashedPassword,
      contact: req.body.contact,
    });
    let findUser = await User.find({ username: req.body.username });
    if (findUser.length == 0) {
      await newUserData.save();
      let token = jwt.sign(
        {
          data: {
            name: req.body.name,
            username: req.body.username,
            institution: req.body.institution,
          },
          type: "Student",
        },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Username Exists");
    }
  })
);

userRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { username, password } = req.body;
    let userFind = await User.find({ username: username });
    if (userFind.length != 0) {
      let storedPassword = userFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: userFind[0].name,
              username: userFind[0].username,
              institution: userFind[0].institution,
            },
            type: "Student",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password!");
      }
    } else {
      throw new ExpressError(404, "Username not found!");
    }
  })
);

userRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = userRouter;
