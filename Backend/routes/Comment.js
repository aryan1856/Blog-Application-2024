const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const post = require('../models/posts')
const comment = require('../models/comments')
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

//update
router.put("/:id", verifyToken, async(request, response) => {
    try {
        const updatedComment = await comment.findByIdAndUpdate(request.params.id, {$set:requestBody},{new:true})
        response.status(200).json(updatedComment)
    } catch (error) {
        response.status(500).json(error)
    }
})

//delete
router.delete("/:id", async(request, response) => {
    try {
        await comment.findByIdAndDelete(request.params.id)
        response.status(200).json("Comment deleted")
    } catch (error) {
        response.status(500).json(error)
    }
})

//get comments
router.get("/post/:postId", async(request, response) => {
    try {
        const comments = await comment.find({postId:request.params.postId})
        response.status(200).json(comments)
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router