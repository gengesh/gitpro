const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();
const cors = require('cors');
app.use(cors());
const PlayerRoutes = require('./routes/player')
app.use(bodyParser.json({extended:false}));
app.use(PlayerRoutes);
sequelize.sync().then((results) => {
    // console.log(results);
    app.listen(4000);
}).catch(err => console.log(err));
    