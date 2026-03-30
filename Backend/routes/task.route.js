const authMiddleware = require("../middlewares/auth.middleware");

const express = require("express");
const TaskModel = require("../models/task.model");

const taskRouter = express.Router();

 
// Add Task

taskRouter.post('/add-task', authMiddleware(["user" || "admin" || "s_admin"]) ,async(req, res) => {

    const userId  = req.userId;

    const { title , description} = req.body;

    if(!title || !description){
        res.json({msg : "All fields are required ! "});
        return;
    }

    try{
 
         await TaskModel.create({title, description, createdBy : userId});

         res.json({msg : `${title} successfully added ! `});
         
        }catch(err){

        res.json({msg : `Error occur on task create : ${err.message}`});

    }
});

// Update Task


module.exports = taskRouter;