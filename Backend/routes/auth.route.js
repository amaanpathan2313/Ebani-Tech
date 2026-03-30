
const AuthModel = require("../models/auth.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');

const authRoute = express.Router();

authRoute.post('/sign-up', async(req, res) => {

    const {name, phon, email, password} = req.body;
    const {role} = req.body;

    console.log(password)
    if(!name || !phon || !email || !password){
         res.status(406).json({msg : "Fill All details correctly ! "});
         return;
    }
    if(phon.length != 10){
         res.status(406).json({msg : "Enter Correct Phon Number ! "});
         return;
    }

    try {

        let existUser = await AuthModel.findOne({email});

        if(existUser){
            res.status(406).json({msg : `${email} is already register with system plz login`});
            return;
        }

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
           });

         await AuthModel.create({name, phon, email, password, role});

         res.status(201).json({msg : `${email} you are successfully sign-up !`})
         
        } catch (err) {

        res.status(500).json({msg : `Error occur while sign-up : ${err.message}`});
        
    }
})


module.exports = authRoute;