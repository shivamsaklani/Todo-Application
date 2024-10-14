const mongonse=require("mongoose");
const Schema=mongonse.Schema;
const ObjectId=Schema.ObjectId;
// Global User Stores data in database
const User=new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

// Global Todo for user stores in database

const Todo=new Schema({
    userId:ObjectId,
    title:String,
    done:Boolean,
    time:{type:Date,default:Date.now()}
})

const UserModel=mongonse.model('todo-users',User); // Connects to the database
const TodoModel=mongonse.model("todo-tasks",Todo);

module.exports={
    UserModel,
    TodoModel
}
