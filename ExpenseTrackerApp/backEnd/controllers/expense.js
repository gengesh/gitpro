const Expenses = require('../models/expenses.js');
const Users = require('../models/users.js');

exports.postExpense = async (req,res1,next) => {
    // console.log("this is constroller req",req.body);
    var response ;
    await Expenses.create({
        amount:req.body.amount,
        description:req.body.description,
        category:req.body.category,
        UserId:req.user.id,
    })
    .then( async response =>{
        response = response;
        const TotalExpenses = Number(req.user.totalExpense) + Number(req.body.amount) ;
        console.log("this is total expense:",TotalExpenses)
        await Users.update({totalExpense:TotalExpenses },{where:{id:req.user.id}})
        .then(res => {
            console.log("update res:",res)
            res1.status(201).json({response});
        }).catch(err =>{
            console.log(err);
            res1.status(501).json({response});
        })
    }).catch(err =>{
        console.log(err);
        res1.status(403).json({response})
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
    try{
        Expenses.findOne({
            where:{id:deleteId}
        })
        .then( async response =>{
            const TotalExpenses = Number(req.user.totalExpense) - Number(response.amount) ;
            console.log("this is total expense:",TotalExpenses)
            await Users.update({totalExpense:TotalExpenses },{where:{id:req.user.id}})
            await Expenses.destroy({
                where:{id:deleteId,UserId:req.user.id}
            })
            .then(response => {
                console.log(response);
                res.status(200).json({message:"successfully deleted"});
            })
    }).catch(err =>{
        console.log(err);
    })
}catch(err){
    console.log(err);
}
}