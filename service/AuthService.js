import bcrypt from "bcrypt"
import { client } from "../db.js"
import TokenService from "./TokenService.js"
import { salt } from "../env.js"
import chalk from "chalk"


class UserService {
    async registration(email, firstName, lastName, password, avatarUrl) {

        const candidateSql = `INSERT INTO users (first_name, last_name, email, password_hash, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING id`

        const passwordHash = await bcrypt.hash(password, salt)

        const candidate = await client.query(candidateSql, [firstName, lastName, email, passwordHash, avatarUrl])
        const idCandidate = candidate.rows[0].id

        const accsessToken = TokenService.generateToken(idCandidate)
        return {
            candidate: candidate.rows[0],
            accsessToken,
        }

    }

    async login(email, password) {

        const user = await client.query("SELECT * FROM users WHERE email=$1", [email])

        if (!user.rows[0]) {
            throw new Error('Пользователь не зарегистрирован')
        }

        const isValidPass = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!isValidPass) {
            throw new Error("Неверный логин или пароль")
        }

        const accsessToken = TokenService.generateToken(user.rows[0].id)

        const { password_hash, ...userData } = user.rows[0]

        return {
            candidate: userData,
            accsessToken,
        }
    }

    async getMe(userId) {
        const { rows } = await client.query("select * from users where id=$1", [userId])
        const user = rows[0]

        if (!user) {
            throw new Error("Пользователь не найден")
        }

        const { password_hash, ...userData } = user

        return {
            ...userData,
        }
    }


}

export default new UserService()