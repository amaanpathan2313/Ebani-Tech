const authMiddleware = require("../middlewares/auth.middleware");

const express = require("express");
const TaskModel = require("../models/task.model");

const taskRouter = express.Router();

// Add Task

taskRouter.post(
  "/add-task",
  authMiddleware(["user" || "admin" || "s_admin"]),
  async (req, res) => {
    const userId = req.userId;

    const { title, description } = req.body;

    if (!title || !description) {
      res.json({ msg: "All fields are required ! " });
      return;
    }

    try {
      await TaskModel.create({ title, description, createdBy: userId });

      res.json({ msg: `${title} successfully added ! ` });
    } catch (err) {
      res.json({ msg: `Error occur on task create : ${err.message}` });
    }
  },
);

// Update Task

taskRouter.patch(
  "/update-task/:id",
  authMiddleware(["user", "admin", "s_admin"]),
  async (req, res) => {
    const { id } = req.params;
    // const updateData = req.body;
    const userId = req.userId;
    const role = req.userRole;

    try {
      let targetTask = await TaskModel.findById(id);

      if (!targetTask) {
        res.status(404).json({ msg: "Task not found ! " });
        return;
      }

      if (
        targetTask.createdBy.toString() === userId ||
        role == "admin" ||
        role == "s_admin"
      ) {

        const updateTask = {
          status: !targetTask.status
        };


       let update = await TaskModel.findByIdAndUpdate(id, updateTask, { returnDocument: "after" });

        res.status(200).json({ msg: "Task Update" , update});
      } else {
        res
          .status(401)
          .json({ msg: "You are not allowed to perform this operation" });
        return;
      }
    } catch (err) {
      res
        .status(500)
        .json({
          msg: `Internal server error at update task  : ${err.message}`,
        });
    }
  },
);

// get Task
taskRouter.get(
  "/my-task",
  authMiddleware(["user", "admin" , "s_admin"]),
  async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const role = req.userRole;

    try {
      if (role == "user") {
        let all_tasks = await TaskModel.find({ createdBy: userId });
        res.status(200).json({ all_tasks });
        return;
      } else if (role == "admin" || role == "s_admin") {
        let all_tasks = await TaskModel.find({});
        res.status(200).json({ all_tasks });
        return;
      } else {
        res.json({ msg: "Task not found ! " });
      }
    } catch (err) {
      res
        .status(500)
        .json({ msg: `Internal server error at get task  : ${err.message}` });
    }
  },
);

// delete Task
taskRouter.delete(
  "/delete-task/:id",
  authMiddleware(["user" , "admin" , "s_admin"]),
  async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.userId;
    const role = req.userRole;

    try {
      let targetTask = await TaskModel.findById(id);

      if (!targetTask) {
        res.status(404).json({ msg: "Task not found ! " });
        return;
      }

      if (role == "user" && userId == targetTask.createdBy) {
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Task Delete" });
        return;
    }else if(role == "admin" || role == "s_admin"){
          await TaskModel.findByIdAndDelete(id);
          res.status(200).json({ msg: "Task Delete" });
       return;
      } else {
        res
          .status(401)
          .json({ msg: "You are not allowed to perform this operation" });
        return;
      }
    } catch (err) {
      res
        .status(500)
        .json({
          msg: `Internal server error at delete task  : ${err.message}`,
        });
    }
  },
);

module.exports = taskRouter;
