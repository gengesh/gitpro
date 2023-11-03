const Expenses = require('../models/expenses.js');


exports.postExpense = async (req,res,next) => {
    console.log("this is constroller req",req.body);
    await Expenses.create({
        amount:req.body.amount,
        description:req.body.description,
        category:req.body.category,
    })
    .then(response =>{
        console.log("response is :",response);
        res.status(201).json({response});
        // res.status(200).json({message:"404"});
    })
}

exports.getExpense = async (req,res,next)=> {
    console.log("this is constroller getexpense",req.body);
    const expenses = await Expenses.findAll()
    .then(response => {
       console.log("total expenses:",response[0]);
       res.status(200).json({expenses:response});     
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.deleteExpense =  async (req,res,next) => {
    const deleteId = req.params.deleteId;
    console.log("deleteid is :",deleteId);
    await Expenses.destroy({
        where:{id:deleteId}
    })
    .then(response => {
        console.log(response);
        res.status(200).json({message:"successfully deleted"});
    })
    .catch(err =>{
        console.log(err);
    })
}