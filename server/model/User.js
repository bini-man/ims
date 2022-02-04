const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        min:6
    },
    last_name:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    role:{
       type:String
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    }
    // status:{
    //     type:String
    // }
}) 
module.exports=mongoose.model('User',UserSchema)