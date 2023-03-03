const express = require('express');
const router = express.Router();
const Student = require('../model/student');

router.get('/', (req,res,next) => {
    Student.find()
    .then(result => {
        res.status(200).json({
            data : result
    })
    })
    
})

router.post('/', (req,res,next) =>{
    // console.log(req.body);
    const student = new Student({
        name : req.body.name,
        email: req.body.email,
        tel : req.body.tel,
        gender : req.body.gender
    })
    student.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.get('/:id', (req,res,next) => {
    Student.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            data : result
    })
    })
    .catch(err =>{
        res.status(500).json({
            error : err
    })
    })
})

router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            msg : "Data deleted sucessfully",
            data : result
        })
    })
    .catch(err => {
        res.status(500).json({
            msg : "Error Found",
            error : err
        })
    })
})

router.put('/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        name : req.body.name,
        email: req.body.email,
        tel : req.body.tel,
        gender : req.body.gender
    })
    .then(result =>{
        res.status(200).json({
            msg : "Data updated sucessfully",
            data : result
        })
    })
    .catch(err => {
        res.status(500).json({
            msg : "Error Found",
            error : err
        })
    })
})




module.exports = router;