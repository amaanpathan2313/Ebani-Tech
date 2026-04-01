const AuthModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
require('dotenv').config();

 
const express = require("express");

const authRoute = express.Router();

// sign-up
authRoute.post("/sign-up", async (req, res) => {
  const { name, phon, email, password } = req.body;
  const { role } = req.body;

  // console.log(password, name, email, phon);
  if (!name || !phon || !email || !password) {
    res.status(406).json({ msg: "Fill All details correctly ! " });
    return;
  }
  if (phon.length != 10) {
    res.status(406).json({ msg: "Enter Correct Phon Number ! " });
    return;
  }
  
  try {
    let existUser = await AuthModel.findOne({ email });
   
    
    if (existUser) {
      res
      .status(406)
      .json({ msg: `${email} is already register with system plz login` });
      return;
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res
          .status(500)
          .json({ msg: "Error occur while hashing the password", err });
        return;
      }
      if (hash) {
        await AuthModel.create({ name, phon, email, password: hash, role });

        res
          .status(201)
          .json({ msg: `${email} you are successfully sign-up !` });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: `Error occur while sign-up : ${err.message}` });
  }
});

// login

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  try {
    let targetUser = await AuthModel.findOne({email});
    // console.log(targetUser)

    if (!targetUser) {
      res.status(404).json({ msg: `User not found with ${email} plz Sign-up !` });
      return;
    }

    // Load hash from your password DB.

    let hash = targetUser.password;
    bcrypt.compare(password, hash, function (err, result) {
      // result == true
      if(result){

        var token = jwt.sign({ role : targetUser.role, id : targetUser._id, name : targetUser.name }, process.env.JWT_KEY);


          res.status(200).json({msg : `${targetUser.name} successfully login !`, token });
          
        }else{
          res.status(403).json({msg : "Wrong password plz try again ! "});
      
        }
        
        if(err){
            res.status(500).json({msg : "Error occur while hashing the password !  ", err});
       
            
        }
        
        
    });
} catch (err) {
    
    res.status(500).json({msg : "Error occur on sign up !  ", err});
    

  }
});

module.exports = authRoute;
