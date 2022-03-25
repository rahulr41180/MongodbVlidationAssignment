
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    email : {type : String, required : true},
    pincode : {type : Number, required : true},
    age : {type : Number, required : true},
    gender : {type : String, required : true, default : "Male"}
},
{

    timestamps : true,
    versionKey : false
});

const User1 = mongoose.model("user", UserSchema);

module.exports = User1;