const express = require('express')
const router = express.Router();
const postModel = require('../models/post')
//APIs
router.get('/', async (req,res)=>{
    try {
        const getAllPosts = await postModel.find({}).populate('author');
        res.json(getAllPosts);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
})
router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const post = await postModel.findById(id).populate('author');;
        res.json(post);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }

})

router.post('/', async (req,res)=>{
    //Another way for add // instance method
    /*postModel.create(req.body,(err, savedPost)=>{
        if (!err) {
            return res.json(savedPost);
        }
        res.json({ Error: "DataBase ERRORR"});
    });*/
    // static method
    const post = new postModel(req.body) ;
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
})

router.put('/:id', async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const updatedPost = await postModel.findByIdAndUpdate(id,body,{new:true}).populate('author');
        res.json(updatedPost);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    try {
        const postUser= await postModel.findByIdAndDelete(id);
        res.json(postUser);
    } catch (error) {
        res.json({ Error: "DataBase ERRORR"});
    }
})

module.exports = router