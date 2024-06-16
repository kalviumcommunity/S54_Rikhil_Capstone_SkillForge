const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const { submissionValidation } = require("../utils/validation.js");
const Task = require("../models/task.js");
const User = require("../models/user.js");
const Submission = require("../models/submission.js");
const submissionRouter = express.Router();
require("dotenv").config({ path: "../.env" });

const validateSubmission = (req, res, next) => {
  let { error } = submissionValidation.validate(req.body);
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
      req.body.orgname = result.data.orgname;
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

submissionRouter.get(
  "/particular/:id",
  extractName,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let findUser = await User.findOne({ username: req.body.username });
    if (findUser != null) {
      let result = await Submission.findOne({
        $and: [{ task: id }, { user: findUser._id }],
      });
      res.send(result);
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

submissionRouter.get(
  "/user/particular",
  extractName,
  wrapAsync(async (req, res) => {
    let findUser = await User.findOne({ username: req.body.username });
    if (findUser != null) {
      let result = await Submission.find({ user: findUser._id });
      res.send(result);
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

submissionRouter.get(
  "/task/particular/:id",
  jwtVerify,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let result = await Submission.find({ task: id }).populate("user");
    res.send(result);
  })
);

submissionRouter.get(
  "/company/particular",
  jwtVerify,
  wrapAsync(async (req, res) => {
    let { orgname } = req.body;
    let result = await Submission.aggregate([
      {
        $lookup: {
          from: 'tasks', // The name of the tasks collection
          localField: 'task',
          foreignField: '_id',
          as: 'task'
        }
      },
      { $unwind: '$task' },
      {
        $lookup: {
          from: 'companies', // The name of the companies collection
          localField: 'task.company',
          foreignField: '_id',
          as: 'task.company'
        }
      },
      { $unwind: '$task.company' },
      {
        $match: {
          'task.company.orgname': orgname
        }
      }
    ]);
    res.send(result);
  })
);

submissionRouter.post(
  "/new/:id",
  validateSubmission,
  extractName,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let findTask = await Task.findById(id);
    if (findTask != null) {
      let findUser = await User.findOne({ username: req.body.username });
      if (findUser != null) {
        let newData = new Submission({
          repo: req.body.repo,
          deployed: req.body.deployed,
          description: req.body.description,
        });
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

submissionRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = submissionRouter;
