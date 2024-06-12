const express = require("express");
const razorpay = require("razorpay");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const Company = require("../models/company");
const Transaction = require("../models/transaction");
const Submission = require("../models/submission");
const paymentRouter = express.Router();
require("dotenv").config();

paymentRouter.use(express.json());

const instance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

paymentRouter.post(
  "/checkout",
  wrapAsync(async (req, res) => {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  })
);

paymentRouter.get("/getkey", (req, res) => {
  res.json({ key: process.env.KEY_ID });
});

paymentRouter.post("/paymentverification", async (req, res) => {
  try {
    let { to, amount, from, id, subID } = req.query;
    let findUser = await User.findOne({ username: to });
    if (findUser != null) {
      let findComp = await Company.findOne({ orgname: from });
      if (findComp != null) {
        let newTransaction = new Transaction({
          amount: amount,
          to: findUser._id,
          from: findComp._id,
        });
        await newTransaction.save();
        findUser.wallet = findUser.wallet + amount;
        await findUser.save();
        await Submission.findByIdAndUpdate(subID, { winner: true });
        res.redirect(`http://localhost:5173/task/details/${id}`);
      } else {
        res.status(404, "Company Not Found!");
      }
    } else {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = paymentRouter;
