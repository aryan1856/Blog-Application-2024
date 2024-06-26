const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true,
        unique: false
    },
    desc : {
        type : String,
        required: true
    },
    photo : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required: true
    },
    userId : {
        type : String,
        required: true
    },
    category: {
        type : Array,
        required : false
    }
}, {timestamps:true})

module.exports = mongoose.model("Post", postSchema)