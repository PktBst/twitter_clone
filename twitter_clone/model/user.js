const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    _id:{
       type:mongoose.Schema.Types.ObjectId,
       required:true
    },

    username:{
        type: mongoose.Schema.Types.String,
        required:true
    },

    password:{
        type: mongoose.Schema.Types.String,
        required:true
    },

    newPassword:mongoose.Schema.Types.String,
    tweets:mongoose.Schema.Types.Array
})

module.exports = mongoose.model('User',userSchema)