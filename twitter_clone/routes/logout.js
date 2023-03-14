const express=require("express")
const router=express.Router();

router.post('/',(req,res)=>{ 
    req.session.destroy()
    .then(res.status(200).json({message:`user logged out`}))
    .catch(err=>res.status(200).json({message:err}))
})

module.exports=router;