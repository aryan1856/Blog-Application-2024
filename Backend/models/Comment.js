const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const post = require('../models/Post')
const comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//create
router.post("/create", verifyToken, async(request, response) => {
    try {
        const newComment = new comment(request.body)
        const savedComment = await newComment.save()
        response.status(200).json(savedComment)
    } catch (error) {
        response.status(500).json(error)
    }
})

//