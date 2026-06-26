import express from 'express'
import { env } from '../config/env.service.js'
import { db_Connection } from './database/dbConnection.js'
import { GlobalErrorHandling, NotFoundException } from './common/response/error.response.js'
import { Success } from './common/response/success.response.js'
import authRouter from './module/auth/auh.controller.js'
import userRouter from './module/user/user.controller.js'
import cors from 'cors'

export const bootstrap=()=>{
    const app=express()
    app.use(express.json())
    db_Connection()

    app.use(cors("*"))
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use(GlobalErrorHandling)
    app.listen(env.port,()=>{
        console.log("srever is running")
    })
}