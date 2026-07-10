import nodemailer from 'nodemailer'
import { env } from '../../../config/env.service.js'

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:env.google_account,
        pass:env.google_app_password
    }
    
})
export const sendEmail=async({to,subject,html})=>{
    const info= await transporter.sendMail({
        from:env.google_account,
        to,
        subject,
        html
    })
}