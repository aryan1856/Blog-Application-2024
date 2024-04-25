const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const post = require('../models/posts.js')
const comment = require('../models/comments.js')
const verifyToken = require('../verifyToken')

//create
router.post("/create", verifyToken, async(request, response) => {
    try {
        const newPost = new post(request.body)
        const savedPost = await newPost.save()
        response.status(200).json(savedPost)
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router