const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : String,
    email : String,
    tel : String,
    gender : String
})

module.exports = mongoose.model('Student', studentSchema);