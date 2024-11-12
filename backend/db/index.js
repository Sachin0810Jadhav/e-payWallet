const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jadhavsachin0810:Sachin%4012@clusterfor100xdev.ha6nh.mongodb.net/e-payWallet")

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    lastname :String

});


const User= mongoose.model("users",userSchema);

const accountSchema =mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }


})

const Account = mongoose.model("accounts",accountSchema);

const historySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    personName:String,
    addedToAccount:Boolean,
    amount: Number,
    date: String
})

const History = mongoose.model("history",historySchema);

module.exports ={User,Account,History}