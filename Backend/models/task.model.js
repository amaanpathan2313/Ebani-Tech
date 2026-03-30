
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title :{ 
    type : String,
    required : true,
    unique : true,
    },
    description : {
       type : String,
       required : true,
   },
   status : {
    type : Boolean,
    default : false
   },

   createdBy : {
    type : mongoose.Schema.Types.ObjectId, ref : "authentication"
   }



});

const TaskModel = mongoose.model("tasks", taskSchema);

module.exports = TaskModel;