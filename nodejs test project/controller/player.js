const Player = require('../model/players');
const path = require('path');
exports.postPlayer = async (req,res,next) => {
    console.log("total post players:",req.body);
    const name = req.body.name;
    const dob = req.body.dob;
    const photo =req.body.photo;
    const birthplace =req.body.birthplace;
    const career =req.body.career;
    const score =req.body.score;
    const matches =req.body.matches;
    const fifties =req.body.fifties;
    const centuries =req.body.centuries;
    const wicket =req.body.wicket;
    const average =req.body.average;

   const data = await Player.create ({
    name:name,
    dob:dob,
    photo:photo,
    birthplace:birthplace,
    career:career,
    score:score,
    matches:matches,
    fifties:fifties,
    centuries:centuries,
    wicket:wicket,
    average:average
       });
       res.status(201).json({newPlayer: data});
    
}
exports.getPlayer = async (req,res,next) => {
console.log(req.body);
res.status(200).json({allPlayer:req.body});
}

exports.postSearch = async (req,res,next) => {
 const players = await Player.findAll();
 const search = req.body.search;
 var searchPlayer;
  players.forEach((player) =>{
    if(player.name == search)
    return searchPlayer = player;
 });
 res.status(200).json({searchPlayer:searchPlayer});
}
exports.postEdit = async (req,res,next) => {
   const playerId = req.body.id;
   const player = await Player.findByPk(playerId)
   .then((player) =>{
        res.status(200).json({player:player});
   })
   .catch(err => console.log(err));
}
exports.updatePlayer = async (req,res,next) => {
   console.log("total update players:",req.body.id);
   const id = req.body.id;
   const name = req.body.name;
   const dob = req.body.dob;
   const photo =req.body.photo;
   const birthplace =req.body.birthplace;
   const career =req.body.career;
   const score =req.body.score;
   const matches =req.body.matches;
   const fifties =req.body.fifties;
   const centuries =req.body.centuries;
   const wicket =req.body.wicket;
   const average =req.body.average;
const obj = {
      id:id,
      name:name,
      dob:dob,
      photo:photo,
      birthplace:birthplace,
      career:career,
      score:score,
      matches:matches,
      fifties:fifties,
      centuries:centuries,
      wicket:wicket,
      average:average
}
  const data = await Player.update(obj,{ 
   where :{id :id},
})
.then(data =>{
   res.status(201).json({updatePlayer: data});
})
.catch(err => console.log(err));
}