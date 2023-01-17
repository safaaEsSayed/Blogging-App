const express = require('express');
const { find } = require('../models/user');
const router = express.Router();
const userModel = require("../models/user");
//Call for APIs
router.get("/", async(req,res)=>{
   //find({filter})
   try {
    const getAllUsers = await userModel.find({});
    res.json(getAllUsers);
   } catch (error) {
    res.json({ Error: "DataBase ERRORR"});
   }
});

router.get("/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        res.json(user);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
       /* 
       userModel.find({_id:id}, (err,user)=>{
        if (!err) return res.json(user);
        res.json({ Error: "DataBase ERRORR"});
    
       });
       */
 });

router.post("/", async(req,res)=>{
    const userData = req.body;
    const user = new userModel(userData) ;
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
 });
//update,updateOne,updateOne,findAndUpdate,findbyIdAndUpdate
//how to update using mongoose
//بياخد اتنين body of req and id in url
//////////////////////////////ليه مش بيتغير الا بعد اتنين send?/////////////////////////////////////////////////////////
/////////////////////////Solved by ==> {new:true} ====> to prevent repeat//////////////////

router.put("/:id", async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id,body,{new:true})
        res.json(updatedUser);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }

 });
///////////////////////////////difference(findbyidanddelete ,findbyidandremove)//////////////////////////////////////////
router.delete("/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        const deletedUser= await userModel.findByIdAndDelete(id)
        res.json(deletedUser);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
 });
module.exports = router