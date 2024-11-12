const {userZod} = require("../types");


const userSignupInputCheck= (req,res,next)=>{
    const result= userZod.safeParse(req.body);
    if(result.success){
        next();
    }
    else{
        res.send(result.error);
    }
}

module.exports= userSignupInputCheck