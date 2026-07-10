import { env } from "../../../config/env.service.js"
import { accessToken, generateToken } from "../../common/middleware/auth/auth.js"
import { encrypted } from "../../common/middleware/security/encryption.js"
import { compareHash, generateHash } from "../../common/middleware/security/generateHash.js"
import { BadRequestException, ConflictException, NotFoundException } from "../../common/response/error.response.js"
import { sendEmail } from "../../common/utils/sendEmail.js"
import { UserModel } from "../../database/model/user.model.js"
import { OAuth2Client } from "google-auth-library"


export const Signup=async(data)=>{
    let {name,email,password,phoneNumber,uniqueAccName}=data
    let existedData= await UserModel.findOne({email})
    if(existedData){
        ConflictException({message:"email is already existed"})
    }
    let hashPassword= await generateHash(password)
    const otp=Math.floor(100000 + Math.random() * 900000)
    let addUser= await UserModel.create({name,email,password:hashPassword,
        phoneNumber:await encrypted(data.phoneNumber),uniqueAccName,otp})
        await sendEmail({to:email,subject:"email is verified",html:`verifiy email by enter otp ${otp}`})
    return addUser

}
export const Login=async(data,host)=>{
    let {email,password}=data
    let userData= await UserModel.findOne({email,isverified:true})
    if (!userData){
        NotFoundException({message:"not found user"})

    }
    let verifyPassword= await compareHash(password,userData.password)
    if(!verifyPassword){
        BadRequestException({message:"password is wrong"})
    }
    let token= generateToken({userid:userData._id},host,userData.role)
    return {token,userData}

}                    

export const generateAceesToken=async(authorization,host)=>{
   let token= accessToken(authorization,host) 
   return token
}


export const GoogleLogin =async(data,host)=>{
let { idToken } = data
const client =new OAuth2Client(env.google_client_id)
 const ticket =await client.verifyIdToken({idToken,audience:env.google_client_id})
 const payload =ticket.getPayload()
console.log(payload)
let userData =await UserModel.findOne({email:payload.email})
if(!userData){
userData = await UserModel.create({
name:payload.name,
email:payload.email,
password:null,
uniqueAccName:payload.email.split("@")[0]})
}
let token =generateToken({userid:userData._id},host,userData.role)
return {token,userData}

}

export const VerifyOtp=async(data)=>{
    let {email,otp}=data
    let userdata=await UserModel.findOne({email})
    if(!userdata){
        NotFoundException({message:"email is not found"})
    }
    if(userdata.otp!=otp){
        BadRequestException({message:"otp is wrong"})
    }
    userdata.isverified=true
    userdata.otp=null
    await userdata.save()
    return userdata

}