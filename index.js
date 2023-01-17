const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
const app = express();

const userRouter = require('./routes/user');
const postsRouter = require('./routes/post');


//middleWare
app.use((req, res,next) =>{
    console.log(`${new Date()}-${req.method}-${req.url}`)
    next();
});
//Handling
app.use(express.json())
app.use('/user',userRouter)
app.use('/post',postsRouter)



mongoose.connect('mongodb://127.0.0.1:27017/bloggingApp',(err) => {
    if(!err) return console.log(`Data Base is connected Successfully`);
    console.log("ERROR in DataBase Connection ==>" ,err);
})



app.listen(PORT,(err)=>{
    if(!err) return console.log(`Server starts at Port ${PORT}`);
    console.log("ERROR in Server Port ==>" ,err);
})