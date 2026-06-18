import bcrypt from 'bcrypt'
import { env } from '../../../../config/env.service.js'

export const generateHash=async(plaintext)=>{
    let hash=await bcrypt.hash(plaintext, +env.salt)
    return hash

}
export const compareHash=async(plaintext,ciphertext)=>{
    let compare= await bcrypt.compare(plaintext,ciphertext)
    return compare

}