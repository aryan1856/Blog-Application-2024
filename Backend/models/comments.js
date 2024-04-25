const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    Comment : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required: true,
        // unique: true
    },
    postId : {
        type : String,
        required: true,
    },
    userId : {
        type : String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model("Comment", commentSchema)