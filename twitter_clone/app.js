const express=require("express");
const app=express();
const bodyParser = require("body-parser")
const cookieParser=require("cookie-parser")
const session=require("express-session")
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:"secret"
    
}))

mongoose.connect('mongodb+srv://admin:passworddb@cluster0.nswxl0v.mongodb.net/t_DB?retryWrites=true&w=majority')
    .then(console.log("connected successfully to DB"))
    .catch(err=> console.log(err))
 
const loginHandler = require('./routes/login')
const signupHandler = require('./routes/signup')
const tweetHandler = require('./routes/tweet')
const logoutHandler=require('./routes/logout')


app.use("/signup",signupHandler)
app.use("/login",loginHandler)
app.use("/tweet",tweetHandler)
app.use("/logout",logoutHandler)



app.use((req,res)=>{
    res.status(404).json("INVALID PATH")
})

module.exports=app;