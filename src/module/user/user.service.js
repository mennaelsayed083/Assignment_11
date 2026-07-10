import { env } from "../../../config/env.service.js"
import { decrypted } from "../../common/middleware/security/encryption.js"
import { compareHash, generateHash } from "../../common/middleware/security/generateHash.js"
import { BadRequestException, ConflictException, NotFoundException } from "../../common/response/error.response.js"
import { UserModel } from "../../database/model/user.model.js"

export const UserData=async(userid)=>{
    let data=await UserModel.findById(userid)
    if (!data){
        NotFoundException({message:"user is not found"})
    }
    data.phoneNumber =await decrypted(data.phoneNumber)
    return data

}
export const UpdateUser = async (userid, data,file) => {
    let coverImage=''
    if(file){
        coverImage=`${env.server_url}/${file.path}`
        console.log(coverImage)
    }

    let findUser = await UserModel.findById(userid)
    if (!findUser) {
        NotFoundException({ message: "not found user" })
    }
    let { name, password, uniqueAccName, newPassword} = data
    let updateData = {}
    updateData.coverPic=coverImage
    if (name) updateData.name = name
   if (uniqueAccName) {

    let existingUser = await UserModel.findOne({uniqueAccName})
    if (existingUser) {
        ConflictException({message: "invalid uniqueAccName"})
    }
    updateData.uniqueAccName = uniqueAccName
}
    if (password && newPassword) {
        let verifyPassword = await compareHash(password, findUser.password)
        if (!verifyPassword) {
            BadRequestException({ message: "invalid password" })
        }
        let hashed = await generateHash(newPassword)
        updateData.password = hashed
    }
    let updated = await UserModel.findByIdAndUpdate(userid,updateData,{ new: true })
    return updated
}