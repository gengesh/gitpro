const Expenses = require('../models/expenses.js');
const Users = require('../models/users.js');
const sequelize = require('../util/database.js');
const DownloadedFile = require('../models/downloadedfile.js')
const UserService = require('../services/userservices.js');
const UploadToS3Service = require('../services/uploadtos3.js');

exports.getexpensedownload = async (req,res,next)  => {
    try {
        const expenses = await UserService.getExpenses(req);
        const userid = req.user.id;
        const stringifiedExpenses = JSON.stringify(expenses);
        const filename = `Expense${userid}/${new Date()}.txt`;
        const fileURL = await UploadToS3Service.uploadToS3(stringifiedExpenses,filename);
        console.log("fileurl is :",fileURL);
        await DownloadedFile.create({
            UserId:userid,
            fileUrl:fileURL
        })
        res.status(200).json({fileURL,success:true});
    
    }catch(err) {
    console.log(err);
    res.status(500).json({fileURL:'',success:false});
    }
   
}



exports.postExpense = async (req,res1,next) => {
    const t = await sequelize.transaction();
    try{
       const createdExpense = await Expenses.create({
            amount:req.body.amount,
            description:req.body.description,
            category:req.body.category,
            UserId:req.user.id,
        },{transaction:t})
            const TotalExpenses = Number(req.user.totalExpense) + Number(req.body.amount) ;
            console.log("this is total expense:",TotalExpenses)
            await Users.update({totalExpense:TotalExpenses },{where:{id:req.user.id},transaction:t})
            await t.commit();
            res1.status(201).json({createdExpense});
    }catch(err){
        await t.rollback();
        res1.status(500).json({});
    }
 }

exports.getExpense = async (req,res,next)=> {
    try{
    const ispremiumuser = req.user.ispremiumuser;
    const expenses = await Expenses.findAll({
        where:{UserId:req.user.id}
    })
     res.status(200).json({expenses,ispremiumuser});     
    }catch(err){
        console.log(err);
        res.status(500).json({});
    }
}

exports.deleteExpense =  async (req,res,next) => {
    const deleteId = req.params.deleteId;
    const t = await sequelize.transaction();
    try{
       const expense = await Expenses.findOne({
            where:{id:deleteId},
            transaction:t
        })
            const TotalExpenses = Number(req.user.totalExpense) - Number(expense.amount);
            await Users.update({totalExpense:TotalExpenses},{where:{id:req.user.id},transaction:t})
            await Expenses.destroy({
                where:{id:deleteId,UserId:req.user.id},
                transaction:t
            })
           await t.commit();
            res.status(200).json({message:"successfully deleted"});
}catch(err){
    await t.rollback();
    console.log(err);
    res.status(500).json({message:"something went wrong"});
}
}