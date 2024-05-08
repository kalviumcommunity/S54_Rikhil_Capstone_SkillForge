const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const taskRouter = express.Router();
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const { taskValidation } = require("../utils/validation.js");
const Task = require("../models/task.js");
const Company = require("../models/company.js");
require("dotenv").config({ path: "../.env" });

const validateTask = (req, res, next) => {
  let { error } = taskValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const jwtVerify = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    if (result.type == "Company") {
      req.body.company = result.data.orgname;
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

taskRouter.get(
  "/all",
  wrapAsync(async (req, res) => {
    let findTasks = await Task.find({}).populate("company");
    res.send(findTasks);
  })
);
taskRouter.get(
  "/one/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let result = await Task.findById(id).populate("company");
    if (result != null) {
      res.send(result);
    } else {
      throw new ExpressError(404, "Task not found!");
    }
  })
);
taskRouter.get(
  "/particular/company",
  jwtVerify,
  wrapAsync(async (req, res) => {
    let findComp = await Company.findOne({ orgname: req.body.company });
    if (findComp != null) {
      let result = await Task.find({ company: findComp._id });
      res.send(result);
    } else {
      throw new ExpressError(404, "Company not found!");
    }
  })
);

taskRouter.post(
  "/new",
  jwtVerify,
  validateTask,
  wrapAsync(async (req, res) => {
    let { title, description, bounty, deadline, company, skills } = req.body;
    let companyFind = await Company.findOne({ orgname: company });
    if (companyFind != null) {
      let skillsArr = skills.split(",");
      let newTask = new Task({
        title: title,
        description: description,
        bounty: bounty,
        deadline: deadline,
        skills: skillsArr,
        company: companyFind,
      });
      await newTask.save();
      res.send("SAVED");
    } else {
      throw new ExpressError(404, "Company not found!");
    }
  })
);

taskRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = taskRouter;
