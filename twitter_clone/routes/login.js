const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../model/user');
const router=express.Router();

const joi=require('joi')

router.get('/',((req,res)=>{
    res.status(200).json({DETAILS:req.session.user})
}))

router.get('/:variableId',((req,res)=>{
    res.status(200).json(`login/${req.params.variableId}`)
}))

router.post('/',((req,res)=>{
    const password=req.body.password
    const username=req.body.username

   User.find({username:username})
   .then(result=>{
    bcrypt.compare(req.body.password,result[0].password)
    .then(bool=>{
        if(bool){
                const loggedUser={
                    username:req.body.username,
                    password:result[0].password
                }
                req.session.user=loggedUser
                req.session.save()
                res.status(200).json({message:"session generated", userDetails:req.session.user})
        }
    }
    )
    .catch()
        
   })
   .catch(err=>res.status(500).json({message:"user not found!",userDetails:err}))
    
}))

router.patch('/',((req,res)=>{
    res.status(200).json({message:"PATCH req on /login"})
}))

module.exports=router;

