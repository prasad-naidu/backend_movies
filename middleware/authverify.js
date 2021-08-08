const jwt=require('jsonwebtoken')
   require('dotenv').config()
function authverify(req,res,next){

    const bearrertoken=req.header('AUTH')

    try{
        const user= jwt.verify(bearrertoken,process.env.SECRET)
           req.user=user
        next()
   
    }catch(err){
        res.status(404).send("not valid token")
    }

}



module.exports=authverify