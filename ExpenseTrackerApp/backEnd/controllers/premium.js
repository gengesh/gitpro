const Razorpay = require('razorpay');
const Order = require('../models/premium.js');

const purchasePremium = async (req,res) => {
    try {
        var rzp = new Razorpay({
            key_id:"rzp_test_5KCFt3pioFc3MW",
            key_secret:"ALB4LVBShj7Rdxan1CdLM9H6"
        })
        const amount = 2500;
        rzp.orders.create({amount,currency:"INR"},(err,order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(() => {
                res.status(201).json({order,key_id:rzp.key_id});
            }).catch(err => {
                throw new Error(err);
            })
        })
    }catch(err) {
        console.log(err);
    res.status(403).json({message:'something went wrong',error:err})   }
}
const updateTransactionStatus = (req,res) =>{
    try {
        const {payment_id,order_id}  = req.body;
        Order.findOne({where:{orderid:order_id}})
        .then(order => {
            order.update({paymentid:payment_id,status:'SUCCESSFUL'})
            .then(() => {
        req.user.update({ispremiumuser:true})
        .then(() => {
            return res.status(202).json({success:true,message:"Transaction Successful"});
        }).catch(err => {
            throw new Error(err);
        })
    }).catch(err => {
        throw new Error(err);
    })
}).catch(err => {
    throw new Error(err);
})
}catch(err) {
    console.log(err);
}
}
const failedTransaction = (req,res) =>{
    try {
        const {payment_id,order_id}  = req.body;
        Order.findOne({where:{orderid:order_id}})
        .then(order => {
            order.update({paymentid:payment_id,status:'FAILED'})
            .then(res => {
                console.log(res);
                res.status(401).json({});
            }).catch(err => {
                console.log(err);
            })
        }).catch(err =>{
            console.log(err);
        })
    }catch(err){
        console.log(err);
    }
}
module.exports = {
    purchasePremium,updateTransactionStatus,failedTransaction
}