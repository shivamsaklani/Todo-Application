const dot=require('dotenv');
dot.config();
const mongoose = require("mongoose");
const {z}=require("zod");
const bcrypt=require("bcrypt");

const mongoURI = process.env.MONGO_URI;
const express=require("express");

const jwt=require("jsonwebtoken");
const {UserModel,TodoModel}=require("./db");
const cors=require('cors');

mongoose.connect(mongoURI); // enter your MongooDb Url here

const app=express();
app.use(cors({
  exposedHeaders: ['token']
}));
const {auth,JWT_SECRET}=require("./auth");
app.use(express.json())
app.use(express.static(__dirname+'/public'))




//Signin route
app.post("/signin",async function(req,res){
  let message='';
  let key='';
  let error='';
  const email=req.body.email;
  let password=req.body.password;
  const schema=z.object(
    {
      email:z.string().email().endsWith('.com'),
      password: z.string()
     
    }
  );
  const result =schema.safeParse({email,password});

if (result.success) {
 
   
  
        
        const user =await UserModel.findOne({
          email:email,
        });
  
          if(!user){ // User not exist in database Create new user //
      try{
      
        const hashedpassword=await bcrypt.hash(password,5);
    
      await UserModel.create({
        email:email,
        password:hashedpassword,
      })
      const createuser=await UserModel.findOne({
        email:email,
      })
      let token =jwt.sign({
        id:createuser._id.toString()
      },JWT_SECRET)
     key=token;
        message="You are Signed Up"
    
      
    
      }
      catch(e){
        error="Error while Signup" +e
       
      }
  
    }
    else{  // Signin user with valid Email and password and if correct redirect it to the database

      try{
  
    const passwordMatch=await bcrypt.compare(password,user.password);
   
    if(user && passwordMatch){
      let token =jwt.sign({
        id:user._id.toString()
      },JWT_SECRET)
     key=token;
     message="You are Signed In"
  
    }
    else{
      error="Incorrect Creds";
     
    }
  }
  catch(e){
    error="Error while signin" +e
   
   }
  }
   
  
} 

else {
  // else condition
  error=result.error.format();
}
res.setHeader('token',key);
 res.json({
  message:message,
  error:error
 })
}
)



//Add data Route
app.post("/addtodo",auth,async function(req,res){
  let message='';
try{
const task=req.body.task;
const status=req.body.status;
const id=req.userId;

await TodoModel.create({
  userId:id,
  title:task,
  done:status

})
 message="New task added"

}
catch(e){
  message="Error while adding data"+e
  res.status(500).json({
    mesg:message
  })
}

res.json({
 mesg:message
})


})
//updates Todos
app.post("/update/:id",auth,async function(req,res) {
  const {id}=req.params;
  const userid=req.userId;
  let mesg='';
  try {
    const result= await TodoModel.updateOne({
      _id:id,
      userId:userid
    },{
      $set: {title : req.body.title,done:req.body.done}
    })
    if(result.matchedCount==1){
      mesg="Updated Todo"
    }
  }
  catch(e){
    mesg=`Sorry failed due to ${e}`
  }
  return res.json({
    message:mesg
  })
  
})


//Deleting Todos
app.delete("/deletetodo/:id",auth,async function(req,res){
  const {id}=req.params;
  const userid=req.userId;
  let mesg='';

  try {
   
   const result= await TodoModel.deleteOne({
      _id:id,
      userId:userid
    })
    if(result.deletedCount===0){
      mesg =" UnAuthorized User";
      return res.status(404).json({ message: mesg ,userid:id});
    }
    mesg="todo deleted";

   

  } catch (e) {
    mesg=`Sorry failed due to ${e}`
    
  }
  return res.json({
    message:mesg
  })
})

//Fetching data from database
app.get("/showtodos",auth,async function(req,res){
   
  try{
    const userid=req.userId;
   const todos=await TodoModel.find({
    userId:userid
   })
   res.json({
    todos
   })

  }
  catch(e){
    res.status(500).json({
      message:"Error adding todo"+e
    })
  }

})

//show Each Todo Details
app.get("/details/:id",auth,async function (req,res) {
  let mesg=res.data;
  const {id}=req.params;
  const userid=req.userId;
  try{
   const todo=await TodoModel.findOne({
    _id:id,
    userId:userid
   })
   if(!todo){
    mesg="Not Authorized user or Todo not found";
    return res.status(404).json({mesg});
   }
   
   res.send(todo)

  }catch(e){
    mesg=e
  }

  
})
app.post("/logout", auth, function (req, res) {
  try {
      // remove token from the Browser 

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
});

app.listen(3001);