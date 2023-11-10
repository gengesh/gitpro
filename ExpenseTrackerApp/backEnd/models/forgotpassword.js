const { DataTypes, UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const forgotpasswordrequest = sequelize.define('Forgotpasswordrequest',{
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
  isactive:Sequelize.BOOLEAN,
});
module.exports = forgotpasswordrequest;