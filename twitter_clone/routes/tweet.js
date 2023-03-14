const express = require('express')
const session = require('express-session')
const router = express.Router()
const { default: mongoose } = require('mongoose')
const tweet = require('../model/tweet')
const Tweet=require('../model/tweet')
const User=require('../model/user')

router.get('/',((req,res)=>{
    User.find({username:req.body.username})
    .then(result=>res.status(200).json({message:"tweets fetched",posts:result[0].tweets}))
    // res.status(200).json({message:"GET request on /tweet"})
}))

router.post('/',((req,res)=>{
    const username=req.body.username
    const tweet = new Tweet({
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content,
        user: req.body.username
    })
    User.find({username:username})
    .then(result=>{
        if(result.length!=0){
            const newUserData={
                _id:result[0]._id,
                username:result[0].username,
                password:result[0].password,
                tweets:[...result[0].tweets,tweet._id]
            }
            tweet.save()
            .then(
                User.findOneAndUpdate(result[0]._id,newUserData)
                .then(result => res.status(201).json( {message: 'tweet created', userDetails:result} ))
                .catch(error => res.status(500).json( {message: 'error occurred, tweet post failed', err: error} ))
                )
            .catch(error => res.status(500).json( {message: 'error occurred, tweet post failed', err: error} ))
            
           
        }else{
            res.status(400).status(200).json({message: 'tweet post failed'})
        }
    })
    .catch(error => res.status(500).json( {message: 'error occurred', err: error} ))
    
    
}))

router.patch('/',((req,res)=>{
    res.status(200).json({message:"PATCH request on /tweet"})
}))

router.delete('/',((req,res)=>{ 
    //incomplete
    

    tweet.findByIdAndDelete(res._id)
    .then(res=>res.status(200).json({message:"DELETE request on /tweet"}))
    .catch(err=>res.status(200).json({message:err}))
}))

module.exports = router;