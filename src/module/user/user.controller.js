import { Router } from "express";
import { auth } from "../../common/middleware/auth/auth.js";
import { Success } from "../../common/response/success.response.js";
import { UpdateUser, UserData } from "./user.service.js";
import { Upload } from "../../common/middleware/upload.js";
const router= Router()

    router.get('/get_user_data',auth,async(req,res)=>{
        let userdata= await UserData(req.user)
        Success({res,data:userdata})
    })
    router.put('/update_user_profile',auth,Upload().single("coverImage"),async(req,res)=>{
        let updated=await UpdateUser(req.user,req.body,req.file)
        Success({res,message:"success updated",data:updated})
    })




export default router