import { env } from "../../../config/env.service.js"

export const ErrorResponse=({message="something went wrong",status=400,extra=undefined}={})=>{
 throw new Error(message,{cause:{status,extra}})
}
export const NotFoundException=({message="not found",status=404,extra=undefined}={})=>{
    return ErrorResponse({message,status,extra})

}
export const BadRequestException=({message="bad request",status=400,extra=undefined}={})=>{
    return ErrorResponse({message,status,extra})

}
export const ConflictException=({message="conflict error which is already exist",status=409,extra=undefined}={})=>{
    return ErrorResponse({message,status,extra})

}
export const UnAutorizedException=({message="un authorized error",status=401,extra=undefined}={})=>{
    return ErrorResponse({message,status,extra})

}
export const ForbiddenException=({message="forbidden error",status=403,extra=undefined}={})=>{
    return ErrorResponse({message,status,extra})

}
 export const GlobalErrorHandling=(err,req,res,next)=>{
    const mood=env.mood=="dev"
    const status=err.status?err.status:err.cause?err.cause.status:500
    const defaultMessage="somthing went wrong"
    const displayedMessage=err.message||defaultMessage
    res.status(status).json({
      stack:mood?err.stack:null,
      message:mood?displayedMessage:defaultMessage,
      extra:mood?err.cause:null
    })
 }