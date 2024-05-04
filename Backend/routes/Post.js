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

//update
router.put("/:id", verifyToken, async(request, response) => {
    try {
        const updatedPost = await post.findByIdAndUpdate(request.params.id, {$set:request.body},{new:true})
        response.status(200).json(updatedPost)
    } catch (error) {
        response.status(500).json(error)
    }
})

//delete
router.delete("/:id", verifyToken, async(request, response) => {
    try {
        await post.findByIdAndDelete(request.params.id)
        await comment.deleteMany({postId:request.params.id})
        response.status(200).json("Post deleted")
    } catch (error) {
        response.status(500).json(error)
    }
})

//get post details
router.get("/:id", async(request, response) => {
    try {
        const Post = await post.findById(request.params.id)
        response.status(200).json(Post)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.get("/", async(request, response) => {
    const query = request.query;
    try {
        const searchFilter = {
            title:{$regex:query.search, $options:"i"}
        }
        const posts = await post.find(query.search ? searchFilter:null)
        response.status(200).json(posts)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.get("/user/:userId", async(request, response) => {
    try {
        const posts = await post.find({userId:request.params.userId})
        response.status(200).json(posts)
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router