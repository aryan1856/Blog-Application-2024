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
        console.log(request.body.category)
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

router.get("/", async (request, response) => {
    const { search, category } = request.query;
    try {
        const searchConditions = {};
        
        if (search) {
            searchConditions.title = { $regex: search, $options: "i" };
        }
        
        if (category) {
            searchConditions.category = category;
        }
        
        const posts = await post.find(searchConditions);
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get("/user/:userId", async(request, response) => {
    try {
        const posts = await post.find({userId:request.params.userId})
        response.status(200).json(posts)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.get("/category/:category", async(request, response) => {
    try {
        const posts = await post.find({category:request.params.category})
        response.status(200).json(posts)
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router