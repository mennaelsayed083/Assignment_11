import express from 'express'
import { env } from '../config/env.service.js'
import { db_Connection } from './database/dbConnection.js'
import { GlobalErrorHandling, NotFoundException } from './common/response/error.response.js'
import { Success } from './common/response/success.response.js'
import authRouter from './module/auth/auh.controller.js'
import userRouter from './module/user/user.controller.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'

export const bootstrap=()=>{
    const app=express()
    app.use(express.json())
    db_Connection()
    const __filename=fileURLToPath(import.meta.url)
    const __dirname=path.dirname(__filename)
    app.use('/upload',express.static(path.join(__dirname,'../upload')))

    app.use(cors("*"))
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use(GlobalErrorHandling)
    app.listen(env.port,()=>{
        console.log("srever is running")
    })
}