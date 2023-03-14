const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: mongoose.Schema.Types.String,
    user: mongoose.Schema.Types.String
})

module.exports = mongoose.model('Tweet',TweetSchema)