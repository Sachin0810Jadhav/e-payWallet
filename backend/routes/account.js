const express = require("express");
const {Account,History} = require("../db/index")
const router = express.Router();
const userValidation = require("../middlewares/userValidation");
const mongoose = require("mongoose");

router.get("/balance",userValidation, async (req,res)=>{
    const account = await Account.findOne({userId:req.userId});
    if(account){
        res.json({balance:account.balance});
    }
    else{
        res.json({msg:"user doesnt have account"});
    }
    

})

router.put("/balance",userValidation, async (req,res)=>{
    try {
        const  acc = await Account.findOne({userId:req.userId});
    const newBal = Number(acc.balance) + Number(req.body.amount);
    await Account.updateOne({userId:req.userId},{$set:{balance:newBal}});
    res.json({balance:newBal,msg:"amount added successfully"});
    } catch (error) {
        res.json({msg:"failed to add amount"})
    }
    

});

router.post("/transfer", userValidation, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        });
    }

    try {
        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Invalid account"
            });
        }
    } catch (error) {
        return res.status(400).json({
            msg: "Invalid to account"
        });
    }

    

    

    // Perform the transfer
    if(amount>0){
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    }
    else if(amount<0 || amount==0){
        return res.json({
            msg: "Invalid amount"
        });
    }
    

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        msg: "Transfer successful"
    });

});

router.post("/history",userValidation,async (req,res)=>{
    const {receiverId,receiverName,amount,senderName,date} = req.body;
    const senderData= {userId:req.userId,personName:receiverName,amount,addedToAccount:false,date}
    
    const senderHistory = await History.create(senderData);

    const receiverHistory = await History.create({
        userId: receiverId,
        personName:senderName,
        amount,
        addedToAccount:true,
        date
    })
    res.json({senderHistory,receiverHistory});
});

router.get("/history",userValidation,async(req,res)=>{
    const history = await History.find({userId:req.userId});
    
    res.json({history})
});





module.exports= router;