const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required:true, minLength:4 },
    lastName: {type: String, required:true, minLength:4 },
    age: Number,
    email:{type: String, unique: true, match: /.+@.+\..+/ },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel; 