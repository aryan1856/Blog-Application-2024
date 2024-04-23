const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const post = require('../models/Post')
const comment = require('../models/Comment')
const verifyToken = require('../verifyToken')
// const { info } = require('sass')

router.put("/:id",verifyToken, async(request, response) => {
    try {
       if(request.body.password){
        const salt = await bcrypt.genSalt(10) 
        request.body.password = await bcrypt.hashSync(request.body.password, salt)
       } 
       const updatedUser = await User.findByIDAndUpdate(request.params.id,
        {$set : request.body},
        {new: true}
    );
    response.status(200).json("updatedUser")
    } catch (error) {
        response.status(500).json(error)
    }
})

//Delete
router.delete(":/id", verifyToken, async(request, response) => {
    try {
        await User.findByIDAndDelete(request.params.id)
        await post.deleteMany({userId: request.params.id})
        await comment.deleteMany({userId: request.params.id})
        response.status(200).json("User deleted successfully")
    } catch (error) {
        response.status(500).json(error)
    }
})

//get user data
router.get("/:id", async(request, response) => {
    try {
        const user = await User.findByID(request.params.id)
        const {password, ...info} = user._doc
        response.status(200).json(info)
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router