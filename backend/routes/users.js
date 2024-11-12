const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const userSignupInputCheck = require("../middlewares/userSignupInputCheck");
const { User, Account } = require("../db/index");
const userValidation = require("../middlewares/userValidation");
const router = express.Router();
const { updateUser } = require("../types");
const bcrypt = require("bcrypt");

router.post("/signup", userSignupInputCheck, async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ username });

    if (user) {
      res.send("user already exsists");
    } else {
      const { username, password, firstname, lastname } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        password: hashPass,
        firstname,
        lastname,
      });
      const newAccount = await Account.create({
        userId: newUser._id,
        balance: 0,
      });

      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
      res.status(200).json({
        token,
        msg: "user created successfully",
        firstname: newUser.firstname,
        userId:newUser._id
      });
    }
  } catch (error) {
    res.send("Something went wrong unable to create user");
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(200).json({
        token,
        msg: "user signined successfully",
        firstname: user.firstname,
        userId:user._id
      });
    } else {
      res.json({msg:"invalid credentials"});
    }
  } else {
    res.json({msg:"invalid credentials"});
  }
});

router.put("/update", userValidation, async (req, res) => {
  const { success, error } = updateUser.safeParse(req.body);
  if (success) {
    const { password, firstname, lastname } = req.body;
    let updateBody = {};
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      updateBody["password"] = hashPass;
    }
    if (firstname) {
      updateBody["firstname"] = firstname;
    }
    if (lastname) {
      updateBody["lastname"] = lastname;
    }

    const user = await User.updateOne(
      { _id: req.userId },
      { $set: updateBody }
    );
    res.json(user);
  } else {
    res.send("failed to update something went wrong with server");
  }
});

router.get("/bulk", userValidation, async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const userId = req.userId;

    // find the user using his/her first name or last name
    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,$options: 'i'
          },
        },
        {
          lastname: {
            $regex: filter,$options: 'i'
          },
        },
      ],
    });

    // return res
    res.status(200).json({
      users: users
        .filter((user) => user._id.toString() !== userId.toString())
        .map((user) => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          userId: user._id,
        })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/me",userValidation,async(req,res)=>{
  res.json({msg:"user is already logined"})
})

module.exports = router;
