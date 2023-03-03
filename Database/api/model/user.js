const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    role : String,
    phone : Number
})

module.exports = mongoose.model('User', userSchema);