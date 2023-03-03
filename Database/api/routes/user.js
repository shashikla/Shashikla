const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

router.get("/", (req, res, next) => {
    User.find()
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
})

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                phone: req.body.phone,
                password: hash
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        data: result
                    })
                })
                .catch(err => {
                    error: err
                })
        }
    })
})

router.post("/login", (req, res, next) => {
    User.find({
        username: req.body.username,
        email: req.body.email
    })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "User not exist"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    res.status(401).json({
                        message: "Password does not match"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone,
                        role: user[0].role
                    },
                        'this is dummy text',
                        {
                            expiresIn: "24h"
                        });
                    res.status(200).json({
                        username: user[0].username,
                        email: user[0].email,
                        role: user[0].role,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.put('/:id', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        else {
            User.findOneAndUpdate({ _id: req.params.id }, {
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                phone: req.body.phone,
                password: hash
            })
                .then(data => {
                    res.status(200).json({
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

router.delete('/:id', (req, res, next) => {
    User.remove({ _id: req.params.id })
        .then(data => {
            res.status(200).json({
                data: data
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;
