import { client } from "../db.js"

class UserService {

    async saveAvatar(userId, avatarUrl) {

        const query = "UPDATE users SET avatar_url = $1 where id = $2 returning id"
        const { rows } = await client.query(query, [avatarUrl, userId])

        if (!rows[0]) {
            throw new Error("Пользователь не найден")
        }

        return rows[0]

    }
}

export default new UserService()