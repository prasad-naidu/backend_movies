const mongoose=require('mongoose')

const DBconnection=async()=>{
   try{
     const connect= await mongoose.connect("mongodb://localhost:27017/movies",{useNewUrlParser:true})
     console.log("db connected")
   }
   catch(err){
       console.log("can't connect to db")
   }
}

module.exports=DBconnection