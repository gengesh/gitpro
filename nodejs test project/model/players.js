const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Player = sequelize.define('player',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true, 
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
  dob:Sequelize.DATEONLY,
  photo:Sequelize.STRING,
  birthplace:Sequelize.STRING,
  career:{
      type: Sequelize.STRING(1024)
  },
  score:Sequelize.INTEGER,
  matches:Sequelize.INTEGER,
  fifties:Sequelize.INTEGER,
  centuries:Sequelize.INTEGER,
  wicket:Sequelize.INTEGER,
  average:Sequelize.INTEGER
});
module.exports = Player;