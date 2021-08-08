const mongoose=require('mongoose')


const schema=new mongoose.Schema({

   name:{
       type:String,
       required:true
   },
   genre:{
       type:String,
       rewquired:true
   },
   year:{
       type:Number
   }

})

const Movie=mongoose.model("Movie",schema)

module.exports=Movie