import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.resolve('./config/.env')})
const port=process.env.PORT
const db_url=process.env.DB_URL
const salt=process.env.SALT
const user_signature=process.env.USER_SIGNATURE    
const admin_signature=process.env.ADMIN_SIGNATURE
const user_refresh_signature=process.env.USER_REFRESH_SIGNATURE
const admin_refresh_signature=process.env.ADMIN_REFRESH_SIGNATURE
const mood=process.env.MOOD
const google_client_id=process.env.GOOGLE_CLIENT_ID
const encryption_key=process.env.ENCRYPTION_KEY
const google_account=process.env.GOOGLE_ACCOUNT
const google_app_password=process.env.GOOGLE_APP_PASSWORD
const server_url=process.env.SERVER_URL
 
export const env={port,db_url,salt,user_signature,admin_signature,user_refresh_signature,admin_refresh_signature,mood
    ,google_client_id,encryption_key,google_account,google_app_password,server_url
}