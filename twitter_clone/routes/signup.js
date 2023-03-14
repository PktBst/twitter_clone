const express = require('express')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')
const router = express.Router()

const User= require('../model/user')

router.get('/', (req, res) => {
    res.status(200).json({message:"GET req made to /signup"})

})

router.post('/', (req, res) => {
    const username=req.body.username
    User.find({username:username})
    .then(result=>{
        if(result.length==0){
            const saltRounds=10;
            bcrypt.hash(req.body.password,saltRounds)
            .then(result=>{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: result
                })
                user.save()
                .then(result => res.status(201).json( {message: 'User Created', userDetails: result} ))
                .catch(error => res.status(400).json( {message: 'error occurred in the DB', err: error} ))
            })
            .catch(err=>res.status(500).json({message:'Signup Failed',error:err}))
        }else{
            res.status(400).json({message:"user already exists"})
        }
    })
    
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'PATCH request to /signup'} )
})
router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /signup'} )
})
module.exports = router;