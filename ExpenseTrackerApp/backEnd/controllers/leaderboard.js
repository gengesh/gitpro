const Expenses = require('../models/expenses.js');
const Users = require('../models/users.js');

exports.showLeaderboard = async (req,res,next) => {
     // console.log("this is constroller req",req.body);
    await Expenses.findAll()
    .then(async (expenses) =>{
        // console.log("response is :",expenses);
        const map  = new Map();
        for(let i =0;i<expenses.length;i++){
            if(map.has(expenses[i].UserId)){
                map.set(expenses[i].UserId,map.get(expenses[i].UserId) + expenses[i].amount);
            }else{
                map.set(expenses[i].UserId,expenses[i].amount);
            }
        }
        console.log("map is ",map);
        await Users.findAll()
        .then(users => {
          for(let i=0;i<users.length;i++){
            if(!map.has(users[i].id)){
                map.set(users[i].name,0);
            }else{
                map.set(users[i].name,map.get(users[i].id));
                map.delete(users[i].id);
            }
          }  
          const leaderboard = Array.from(map);
          leaderboard.sort((a,b) => b[1] - a[1] );
            res.status(200).json({expense:leaderboard,users});
        })
    })
}