const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const app = express();
const companyRouter = express.Router();
const jwt = require("jsonwebtoken");
const { companyValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const Company = require("../models/company.js");
require("dotenv").config({ path: "../.env" });

companyRouter.use(express.json());

const validateCompany = (req, res, next) => {
  let { error } = companyValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

companyRouter.post(
  "/signup",
  validateCompany,
  wrapAsync(async (req, res, next) => {
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newCompanyData = new Company({
      name: req.body.name,
      orgname: req.body.orgname,
      password: hashedPassword,
      contact: req.body.contact,
      website: req.body.website,
    });
    let findComp = await Company.find({ orgname: req.body.orgname });
    if (findComp.length == 0) {
      await newCompanyData.save();
      let token = jwt.sign(
        {
          data: {
            name: req.body.name,
            orgname: req.body.orgname,
            website: req.body.website,
          },
          type: "Company",
        },
        process.env.JWT_PASS
      );
      res.send(token);
    } else {
      throw new ExpressError(400, "Company Name Exists");
    }
  })
);

companyRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { orgname, password } = req.body;
    let companyFind = await Company.find({ orgname: orgname });
    if (companyFind.length != 0) {
      let storedPassword = companyFind[0].password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: companyFind[0].name,
              orgname: companyFind[0].orgname,
              website: companyFind[0].website,
            },
            type: "Company",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password!");
      }
    } else {
      throw new ExpressError(404, "Company Name not found!");
    }
  })
);

companyRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = companyRouter;
