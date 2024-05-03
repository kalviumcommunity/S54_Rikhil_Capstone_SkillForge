const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const { applicationValidation } = require("../utils/validation.js");
const Application = require("../models/application.js");
const Task = require("../models/task.js");
const User = require("../models/user.js");
const applicationRouter = express.Router();
require("dotenv").config({ path: "../.env" });

applicationRouter.use(express.json());

const validateApplication = (req, res, next) => {
  let { error } = applicationValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const extractName = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    if (result.type == "Student") {
      req.body.username = result.data.username;
      next();
    } else {
      throw new ExpressError(
        403,
        "Not authorised to access this route without correct auth token"
      );
    }
  } catch (err) {
    throw new ExpressError(
      403,
      "Not authorised to access this route without correct auth token"
    );
  }
};

const jwtVerify = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    if (result.type == "Company") {
      next();
    } else {
      throw new ExpressError(
        403,
        "Not authorised to access this route without correct auth token"
      );
    }
  } catch (err) {
    throw new ExpressError(
      403,
      "Not authorised to access this route without correct auth token"
    );
  }
};

applicationRouter.get(
  "/particular/:id",
  extractName,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let findUser = await User.findOne({ username: req.body.username });
    let result = await Application.findOne({
      $and: [{ task: id }, { user: findUser._id }],
    });
    res.send(result);
  })
);

applicationRouter.get(
  "/user/particular",
  extractName,
  wrapAsync(async (req, res) => {
    let findUser = await User.findOne({ username: req.body.username });
    if (findUser != null) {
      let result = await Application.find({ user: findUser._id });
      res.send(result);
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

applicationRouter.get(
  "/task/particular/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let result = await Application.find({ task: id }).populate("user");
    res.send(result);
  })
);

applicationRouter.post(
  "/new/:id",
  extractName,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let findTask = await Task.findById(id);
    if (findTask != null) {
      let findUser = await User.findOne({ username: req.body.username });
      if (findUser != null) {
        let newData = new Application({ why: req.body.why, how: req.body.how });
        newData.user = findUser;
        newData.task = findTask;
        await newData.save();
        res.send("Saved!");
      } else {
        throw new ExpressError(404, "User not found!");
      }
    } else {
      throw new ExpressError(404, "Task not found!");
    }
  })
);

applicationRouter.post(
  "/change/state",
  jwtVerify,
  wrapAsync(async (req, res) => {
    let { state, application } = req.body;
    let findApp = await Application.findById(application);
    if (findApp != null) {
      findApp.state = state;
      await findApp.save();
      res.send("Updated!");
    }
  })
);

applicationRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = applicationRouter;
