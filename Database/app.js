const express = require("express");
const app = express();
const studentRoute = require('./api/routes/student');
const facultyRoute = require('./api/routes/faculty');
const userRoute = require('./api/routes/user');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

app.use(express.json())
app.use(cors());
// app.options('*',cors());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// mongoose.connection.on("error", err => {
//     console.log("connection Failed...");
// })

// // mongoose.connection.on("Connected", connected => {
// //     console.log("connection Successfully...");
// // })


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/user', userRoute);


app.use((req,res,next) => {
    res.status(404).json({message: "Bad request.."})
})

// app.use((req,res,next) => {
//     res.status(200).json({message: "App is running.."})
// })

module.exports = app;