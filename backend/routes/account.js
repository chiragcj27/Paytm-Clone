const express = require('express');
const { default: mongoose } = require('mongoose');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');

const router = express.Router();

// endpoint for user to get balance
router.get("/balance",authMiddleware, async (req,res) => {
    console.log(req.userId);
    const account = await Account.findOne({
        userID: req.userId
    });

    console.log(account);

    res.status(200).json({
        balance: account.balance
    })
});
// endpoint for user to transfer money
router.post("/transfer", authMiddleware, async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to, amount} = req.body;

    const account = await Account.findOne({
        userID: req.userId
    }).session(session);

    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({
        userID: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    await Account.updateOne({
        userID: req.userId
    }, {
        $inc: {balance: -amount}
    }).session(session);

    await Account.updateOne({
        userID: to
    }, {
        $inc: {balance: amount}
    }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

})

module.exports = router;