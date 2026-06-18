import JWT from 'jsonwebtoken'
import { env } from '../../../../config/env.service.js'

export const auth = (req, res, next) => {
    let { authorization } = req.headers
    let [key, token] = authorization.split(" ")

    switch (key) {

        case "Basic":
            const basicData = Buffer.from(token, "base64").toString()
            let [email, password] = basicData.split(":")
            console.log(email, password)
            return next()

        case "Bearer":
            let decoded = JWT.decode(token)

            if (!decoded) return res.status(401).json({ message: "Invalid token" })

            let signature = ""

            switch (decoded.aud?.[0]) {
                case 0:
                    signature = env.user_signature
                    break;

                case 1:
                    signature = env.admin_signature
                    break;

                default:
                    return res.status(401).json({ message: "Invalid role" })
            }
            let decodedData = JWT.verify(token, signature)
            req.user = decodedData.userid
            return next()
    }
}

export const generateToken = (payload, host, role) => {

    let accessSignature = ""
    let refreshSignature = ""

    switch (role) {
        case 0:
            accessSignature = env.user_signature
            refreshSignature = env.user_refresh_signature
            break;

        case 1:
            accessSignature = env.admin_signature
            refreshSignature = env.admin_refresh_signature
            break;
    }

    let accesstoken = JWT.sign(payload, accessSignature, {
        issuer: host,
        audience: [role]
    })

    let refreshToken = JWT.sign(payload, refreshSignature, {
        expiresIn: "1y",
        issuer: host,
        audience: [role]
    })

    return { accesstoken, refreshToken }
}

export const accessToken = (refreshToken, host) => {

    let decoded = JWT.decode(refreshToken)

    if (!decoded) return null

    let refreshSignature = ""
    let accessSignature = ""

    switch (decoded.aud?.[0]) {
        case 0:
            accessSignature = env.user_signature
            refreshSignature = env.user_refresh_signature
            break;

        case 1:
            accessSignature = env.admin_signature
            refreshSignature = env.admin_refresh_signature
            break;

        default:
            return null
    }

    JWT.verify(refreshToken, refreshSignature)

    let newAccessToken = JWT.sign(
        { id: decoded.userid },
        accessSignature,
        {
            expiresIn: "30m",
            issuer: host,
            audience: [decoded.aud[0]]
        }
    )

    return newAccessToken
}