const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const downloadedfile = sequelize.define('downloadedfile',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true, 
    allowNull:false,
    primaryKey:true
  },
  fileUrl:Sequelize.STRING,
  
});
module.exports = downloadedfile;