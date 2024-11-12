const express = require("express");
const userRouter = require("./users");
const accountRouter = require("./account")
const router = express.Router();

const userValidation = require("../middlewares/userValidation");


router.get("/", (req, res) => {
  res.send("hii");
});

router.use("/user",userRouter);
router.use("/account",accountRouter);


router.post("/checkbalance",userValidation,async (req,res)=>{
  res.send("your balance is: 100000");
})
module.exports = router;
