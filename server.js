const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const router=require("./router/router")
const DBconnection=require("./db/database")
const port=process.env.PORT||3002
DBconnection()
app.use(express.json())

app.use(cors())

app.use("/api",router)



app.listen(port,()=>{
    console.log(`listening .. ${port}`)
})