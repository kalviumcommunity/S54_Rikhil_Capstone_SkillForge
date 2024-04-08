const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const app = express();
const institutionRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  companyValidation,
  institutionValidation,
} = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const passwordHash = require("password-hash");
const Institution = require("../models/institution.js");
require("dotenv").config({ path: "../.env" });

institutionRouter.use(express.json());

const validateInstitution = (req, res, next) => {
  let { error } = institutionValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

institutionRouter.post(
  "/signup",
  validateInstitution,
  wrapAsync(async (req, res) => {
    let { password } = req.body;
    let hashedPassword = passwordHash.generate(password);
    let newData = new Institution({
      name: req.body.name,
      password: hashedPassword,
      description: req.body.description,
      address: req.body.address,
      contact: req.body.contact,
    });
    await newData.save();
    let token = jwt.sign(
      {
        data: {
          name: req.body.name,
          description: req.body.description,
        },
        type: "Institution",
      },
      process.env.JWT_PASS
    );
    res.send(token);
  })
);

institutionRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { name, password } = req.body;
    let findInsti = await Institution.findOne({ name: name });
    if (findInsti != null) {
      let storedPassword = findInsti.password;
      if (passwordHash.verify(password, storedPassword)) {
        let token = jwt.sign(
          {
            data: {
              name: findInsti.name,
              description: findInsti.description,
            },
            type: "Institution",
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

institutionRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = institutionRouter;
