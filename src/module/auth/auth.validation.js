import joi from 'joi'

export const signupSchema= joi.object({
        name: joi.string().pattern(/^[a-zA-Z]+$/).required().min(3).max(30),
        email: joi.string().email().required(),
        password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        uniqueAccName:joi.string().required(),
        phoneNumber:joi.string().optional().pattern(/^01[0125][0-9]{8}$/)

    })
    export const loginSchema= joi.object({
        email: joi.string().email().required(),
        password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
    })