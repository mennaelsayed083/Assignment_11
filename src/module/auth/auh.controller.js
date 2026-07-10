import { Router } from "express";
import { generateAceesToken, GoogleLogin, Login, Signup, VerifyOtp } from "./auth.service.js";
import { Success } from "../../common/response/success.response.js";
import { auth } from "../../common/middleware/auth/auth.js";
import { validation } from "../../common/middleware/validation.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
const router=Router()

    router.get("/test",async(req,res)=>{
        Success({res,message:"tested",status:200,data:null})
        
    })
    router.post('/signup',validation(signupSchema),async(req,res)=>{
     let adduser=await Signup(req.body)
     Success({res,message:"user signed up successfully",status:201,data:adduser})
    })
    router.post('/login',validation(loginSchema),async(req,res)=>{
        let userdata=await Login(req.body,req.get('host'))
        Success({res,message:"login successfully",data:userdata})
    })

    router.get('/generate_accesstoken',async(req,res)=>{
        let token= await generateAceesToken(req.headers.authorization,req.get('host'))
        Success({res,message:"success generate access token",data:token})

    })
    router.post("/google-login",async(req,res)=>{
        let data =await GoogleLogin(req.body,req.get("host"))
        Success({res,message:"login successfully",data})})
    
    router.post('/verify_otp',async(req,res)=>{
        let userdata=await VerifyOtp(req.body)
        Success({res,message:"account is verified successfully",data:userdata})
    })






export default router