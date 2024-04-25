const jwt = require('jsonwebtoken')

const verifyToken = (request, response, next) => {
    const token = request.cookies.token
    if(!token){
        return response.status(401).json("Authentication failed");
    }
    jwt.verify(token, process.env.SECRET_KEY, async(error,data) => {
        if(error)
            return response.status(403).json("Token is invalid")
        request.userId = data._id
        next()
    })
}

module.exports = verifyToken;