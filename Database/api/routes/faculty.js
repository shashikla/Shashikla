const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        msg:"This is Faculty GET request"
    })
})

router.post('/', (req,res,next) =>{
    res.status(200).json({
        msg:"this is Faculty POST request"
    })
})

module.exports = router;