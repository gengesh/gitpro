const Expenses = require('../models/expenses.js');


exports.postExpense = async (req,res,next) => {
    // console.log("this is constroller req",req.body);
    await Expenses.create({
        amount:req.body.amount,
        description:req.body.description,
        category:req.body.category,
        UserId:req.user.id,
    })
    .then(response =>{
        // console.log("response is :",response);
        res.status(201).json({response});
        // res.status(200).json({message:"404"});
    })
}

exports.getExpense = async (req,res,next)=> {
    // console.log("this is constroller getexpense",req.body);
    const ispremiumuser = req.user.ispremiumuser;
    const expenses = await Expenses.findAll({
        where:{UserId:req.user.id}
    })
    .then(response => {
    //    console.log("total expenses:",response[0]);
       res.status(200).json({expenses:response,ispremiumuser:ispremiumuser});     
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteExpense =  async (req,res,next) => {
    const deleteId = req.params.deleteId;
    // console.log("deleteid is :",deleteId);
    await Expenses.destroy({
        where:{id:deleteId,UserId:req.user.id}
    })
    .then(response => {
        console.log(response);
        res.status(200).json({message:"successfully deleted"});
    })
    .catch(err =>{
        console.log(err);
    })
}