const jwt=require("jsonwebtoken");

const JWT_SECRET="s3cret";
function auth(req,res,next){
    const token=req.headers.token;
    let mesg="";
    
    try {
        const response=jwt.verify(token,JWT_SECRET);
        if(response){
            req.userId=response.id;
            next();
            mesg="Successful"
          
        }
        else{
            mesg="Error"
            res.status(403)
        }
    } catch (e) {
        mesg=e
        res.send(e);
    }
    
}

module.exports={
    auth,
    JWT_SECRET
}