import CryptoJS from "crypto-js";
import { env } from "../../../../config/env.service.js";

export const encrypted=async(plaintxt)=>{
    return CryptoJS.AES.encrypt(plaintxt,env.encryption_key).toString()
}

export const decrypted=async(encrypted)=>{
    return CryptoJS.AES.decrypt(encrypted,env.encryption_key).toString(CryptoJS.enc.Utf8)
}