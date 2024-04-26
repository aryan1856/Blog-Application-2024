const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { info } = require('sass')

//For register
router.post("/register", async(request, response) => {
    try {
        const {username, email, password} = request.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        response.status(200).json(savedUser)
    } catch (error) {
        // console.log(erorr)
        response.status(500).json(error)
    }
} )

//For Login
router.post("/login", async(request, response) => {
    try {
        const user = await User.findOne({email:request.body.email})
        if(!user)
            return response.status(404).json("User not found")
        const match = await bcrypt.compare(request.body.password, user.password)
        if(!match)
            return response.status(404).json("Wrong password")
        const token = jwt.sign({
            _id, 
            username:user.username,
            email
        }, process.env.SECRET_KEY,{expiresIn: "3d"})
        const{password, ...info} = user._doc
        response.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        }).status(200).json(info)
    } catch (error) {
        response.status(500).json(error)
    }
})

//For Logout
router.get("/logout", async(request, response) => {
    try {
        response.clearCookie("token",{sameSite: 'none', secure: true}).status(200).send("User logged out successfully")
    } catch (error) {
        response.status(500).json(error)
    }
})


//For refresh

router.get("/refresh",(request, response) => {
    const token = request.cookies.token
    jwt.verify(token.process.env.SECRET_KEY,{},async(error, data) => {
        if(error)
            return response.status(404).json(error)
        response.status(200).json(data)
    })
})

module.exports = router