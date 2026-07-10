import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    uniqueAccName:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String
    },
    profilePic:{
        type:String
    },
    coverPic:{
        type:String

    },
    role:{
        type:Number,
        default:0
    },
    otp:{
        type:String
    },
    isverified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const UserModel=mongoose.model("user",userSchema)