import mongoose from "mongoose";
import { env } from "../../config/env.service.js";

export const db_Connection= ()=>{
    mongoose.connect(env.db_url).then(()=>{
        console.log("database is connected")
    }).catch((err)=>{
        console.log("database failed to connect",err)
    })

}