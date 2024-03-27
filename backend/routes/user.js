const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const { signupSchema, signinSchema, updateBodySchema } = require("./types");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { getRandomNumber } = require("../compute.js");

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Wrong Inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  await Account.create({
    userID: user._id,
    balance: getRandomNumber(),
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.status(200).json({
    msg: "User Created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      token: token,
    });

    return;
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { success } = updateBodySchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Error while updating details.",
    });
  }

  await User.updateOne({ _id: req.userID }, req.body);

  res.json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
