import { JWT_ACCESS_SECRET_KEY } from "../env.js";
import jwt from "jsonwebtoken";

class TokenService {

    generateToken(payload) {

        const token = jwt.sign({
            id: payload
        }, JWT_ACCESS_SECRET_KEY, { expiresIn: '10d' })
        return token
    }

    validateToken(token) {
        try {
             const userData = jwt.verify(token, JWT_ACCESS_SECRET_KEY)
             return userData
            console.log(userData)
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default new TokenService()