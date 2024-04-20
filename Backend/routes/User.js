const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const post = require('../models/Post')
const comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

router.put("/:id",verifyToken, async(request, response) => {
    try {
       if(request.body.password){
        const salt = await bcrypt.genSalt(10) 
        request.body.password = await bcrypt.hashSync(request.body.password, salt)
       } 
       const updatedUser = await User.findByIDAndUpdate(request.params.id, )
    } catch (error) {
        response.status(500).json(error)
    }
})