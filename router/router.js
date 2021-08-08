const express = require('express')
const verifyToken=require('../middleware/authverify')
const router=express.Router()
const bcrypt=require('bcryptjs')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const Movie=require("../model/movies")
const User=require("../model/user")
router.post("/movies", async (req,res)=>{
    console.log("user",req.body)
   try{
       const movie=new Movie({
           name:req.body.name,
           genre:req.body.genre,
           year:req.body.year
       })

       await movie.save()

       res.status(200).send(movie)
   }catch(err){
       res.status(404).send("can't send data")
   }

})




router.get("/movies",async(req,res)=>{
    try{
         const result= await Movie.find()
         res.status(200).send(result)
         console.log("res",result)
    }catch(err){
        res.status(404).send("can't get data")
    }
})

router.get("/movies/:id",async(req,res)=>{
    try{
        const result= await Movie.findById(req.params.id)
        if(!result){
            return res.send("no data")
        }
        res.status(200).send(result)  
    }
    catch(err){
        res.status(404).send("can't get movie")
    }
})


router.put("/movies/:id",async(req,res)=>{
    try{
        console.log("coming",req.body.name)
       const movie=await Movie.findById(req.params.id)
       if(!movie){
           res.status(502).send("bad request")
       }

       movie['name']=req.body.name

       await movie.save()
       res.send(movie)

    }catch(err){
        res.status(404).send("can't update movie")
    }
})


router.delete("/movies/:id",async(req,res)=>{
    try{ 
    const result=await Movie.findByIdAndDelete(req.params.id)
    res.send(result)
    }
    catch(err){
        res.status(404).send("can't be deleted")
    }
})


router.post("/register",async(req,res)=>{

     const salt=await bcrypt.genSalt(10)
     const hashedpassword= await bcrypt.hash(req.body.password,salt)


    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password: hashedpassword
    })
     try{
        const result= await user.save()
         res.status(200).send(result)

     }catch(err){
         res.status(404).send("access denied")
     }
})

router.get("/users",verifyToken,async(req,res)=>{
    const user=await User.findById({_id:req.user.user})
    res.status(200).send(user)
})

router.post("/login",async (req,res)=>{
     const validuser=await User.findOne({email:req.body.email})
        
     if(!validuser) return res.status(401).send("access denied!")
     const validpass=await bcrypt.compare(req.body.password,validuser.password)
     if(!validpass) return res.status(401).send("invalid password")
       const user=new User({
           email:req.body.email,
           password:req.body.passowrd
       })
       const result=await user.save()
    const token= jwt.sign({user:result._id},process.env.SECRET)
     req.headers['AUTH']=token
     res.status(200).send(token)
})

module.exports=router