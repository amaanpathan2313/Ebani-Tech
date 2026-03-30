
require('dotenv').config();
const mongoose = require('mongoose');



const databaseConnect = async () => {

    try {

        await mongoose.connect(process.env.DB_LINK);

        console.log("Data Base Successfully Connected !")
        
    } catch (err) {
        
        console.log(`Data Base connection error : ${err.message} `);

    }

};

module.exports = databaseConnect;