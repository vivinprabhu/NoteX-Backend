require('dotenv').config()

const express = require('express')
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const noteRoute = require('./routes/notes')
const logoutRoute = require('./routes/logout')

app.use(express.json())
app.use(cors({credentials: true , origin: ['http://localhost:3000' , 'https://notex-amfu.onrender.com/' ] }))
app.use(cookieParser())

const connection = require("./db")
connection()

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)

//notes
app.use("/api/notes",noteRoute)

//logout
app.use("/api/logout" , logoutRoute)

const port = process.env.PORT
app.listen(port,()=>console.log(`Port running on ${port}`))