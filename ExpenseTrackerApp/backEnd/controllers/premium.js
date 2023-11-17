const Razorpay = require('razorpay');
const Order = require('../models/premium.js');
const sequelize = require('../util/database.js');
require('dotenv').config();
const purchasePremium = async (req,res) => {
    try {
        var rzp = new Razorpay({
            key_id:process.env.ROZARPAY_KEY_ID,
            key_secret:process.env.ROZARPAY_KEY_SECRET
        })
        const amount = 2500;
        rzp.orders.create({amount,currency:"INR"},(err,order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(async () => {
                res.status(201).json({order,key_id:rzp.key_id});
            }).catch(async (err) => {
                throw new Error(err);
            })
        })
    }catch(err) {
        console.log("ROZARPAY_KEY_ID:", process.env.ROZARPAY_KEY_ID);
console.log("ROZARPAY_KEY_SECRET:", process.env);

        console.log(err);
    res.status(403).json({message:'something went wrong',error:err})   }
}



const updateTransactionStatus = async (req,res) =>{
    const t = await sequelize.transaction();
     const {payment_id,order_id}  = req.body;
    try {
            const order = await Order.findOne({where:{orderid:order_id},transaction:t})
            if(order){
            await order.update({paymentid:payment_id,status:'SUCCESSFUL'},{transaction:t})
            await req.user.update({ispremiumuser:true},{transaction:t})
            await t.commit();
            return res.status(202).json({success:true,message:"Transaction Successful"});
        }else{
            await t.rollback();
            return res.status(404).json({success:false,message:"Order not Found"});
        }
} catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


const failedTransaction = async (req,res) =>{
    const t = await sequelize.transaction();
    const {payment_id,order_id}  = req.body;
    try { 
       const order = await Order.findOne({where:{orderid:order_id},transaction:t})
       if(order){
        await order.update({paymentid:payment_id,status:'FAILED'},{transaction:t})
        await t.commit();
        res.status(401).json({message: "Order Failed"});
       }else{
        await t.rollback();
        res.status(404).json({ message: "Order not found" });
       }
    }catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {
    purchasePremium,updateTransactionStatus,failedTransaction
}