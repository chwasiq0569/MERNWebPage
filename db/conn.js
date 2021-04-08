const mongoose = require('mongoose');

const DB = process.env.CONNECTIONSTRING;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("CONNECTION SUCCESSFULL")).catch((err) => console.log(err, "ERROR OCCURED"))