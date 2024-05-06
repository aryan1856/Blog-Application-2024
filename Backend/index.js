const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/User')
const postRoute = require('./routes/Post')
const commentRoute = require('./routes/Comment')

// app.use(cors())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


const ConnectDB = async() => {
    try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log("database connection established");
    }
    catch(err){
       console.log(err);
    }
}

dotenv.config()
app.use(express.json())

app.use("/images", express.static(path.join(__dirname, "/images")))
console.log(cors())

app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

const storage = multer.diskStorage({
    destination : (request,file,fn) => {
        fn(null,"images")
    },
    filename : (request, file, fn) => {
        fn(null, request.body.img)
    }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (request, response) => {
    response.status(200).json("Image uploaded successfully")
})

app.listen(process.env.PORT,() => {
    ConnectDB();
    console.log("app listening on port " + process.env.PORT)
})
