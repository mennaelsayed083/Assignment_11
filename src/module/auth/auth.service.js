import { accessToken, generateToken } from "../../common/middleware/auth/auth.js"
import { compareHash, generateHash } from "../../common/middleware/security/generateHash.js"
import { BadRequestException, ConflictException, NotFoundException } from "../../common/response/error.response.js"
import { UserModel } from "../../database/model/user.model.js"


export const Signup=async(data)=>{
    let {name,email,password,uniqueAccName}=data
    let existedData= await UserModel.findOne({email})
    if(existedData){
        ConflictException({message:"email is already existed"})
    }
    let hashPassword= await generateHash(password)
    let addUser= await UserModel.create({name,email,password:hashPassword,uniqueAccName})
    return addUser

}
export const Login=async(data,host)=>{
    let {email,password}=data
    let userData= await UserModel.findOne({email})
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