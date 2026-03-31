const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const AuthModel = require("../models/auth.model");
const TaskModel = require("../models/task.model");

const adminRoute = express.Router();

// Update user || admin

adminRoute.patch(
  "/admin/update-info/:id",
  authMiddleware(["s_admin", "admin"]),
  async (req, res) => {
    const { id } = req.params;
    const userInfo = req.body;
    const role = req.userRole;

    try {
      let targetUser = await AuthModel.findById(id);

      if (!targetUser) {
        res.status(404).json({ msg: `User not found !` });
        return;
      }

      if (role == "admin" && targetUser.role == "s_admin") {
        res
          .status(406)
          .json({ msg: "you are not allowed to perform this operation" });
        return;
      }

      await AuthModel.findByIdAndUpdate(id, userInfo);

      res.json({
        msg: `${targetUser.name} info update successfully`,
        userInfo,
      });
    } catch (err) {
      res.json({
        msg: `Error occur while update info`,
        err: `${err.message} `,
      });
    }
  },
);

// Delete user

adminRoute.delete(
  "/admin/delete-user/:id",
  authMiddleware(["admin", "s_admin"]),
  async (req, res) => {
    const { id } = req.params;
    const role = req.userRole;

    try {

      let targetUser = await AuthModel.findById(id);

      if (!targetUser) {
        res.status(404).json({ msg: `User not found !` });
        return;
      }

      if (role == "admin" && targetUser.role == "s_admin") {
        res
          .status(406)
          .json({ msg: "you are not allowed to perform this operation" });
        return;
      }

      await TaskModel.deleteMany({createdBy : targetUser.id})
      await AuthModel.findByIdAndDelete(id);

         res.status(200).json({msg : `${targetUser.name} successfully Delete ! `});



    } catch (err) {
      res.json({
        msg: `Error occur while delete user `,
        err: `${err.message} `,
      });
    }
  },
);



module.exports = adminRoute;
