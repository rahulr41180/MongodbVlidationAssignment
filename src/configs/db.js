
const mongoose = require("mongoose");

const Connectdb = () =>
{
    return mongoose.connect("mongodb+srv://rahulr41180:Rahul12345@cluster0.jjbeq.mongodb.net/MongodbValidationAssignment?retryWrites=true&w=majority")
}

module.exports = Connectdb;