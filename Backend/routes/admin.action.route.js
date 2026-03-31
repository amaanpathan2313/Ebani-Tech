
const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const AuthModel = require('../models/auth.model');

const adminRoute = express.Router();




// Update user || admin

adminRoute.patch('/s-admin/update-info/:id', authMiddleware(["s_admin"]) ,async(req, res) => {

    const { id } = req.params;
    const userInfo = req.body;

    try {

        let targetUser = await AuthModel.findById(id);

        if(!targetUser){
            res.status(404).json({msg : `User not found !`});
            return;
        }

        
        
    } catch (err) {
        
    }

});


// Delete user

// Delete Admin

module.exports = adminRoute;