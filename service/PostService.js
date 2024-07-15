import { client } from "../db.js"


class PostService {
    async createPost(title, text, tags, avatar_url, user_id) {
        const query = "INSERT INTO posts (title, text, tags, avatar_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id"
        const { rows } = await client.query(query, [title, text, tags, avatar_url, user_id])

        return rows[0]
    }

    async updatePost(id, title, text, tags, avatar_url, user_id) {

        const post = await client.query("SELECT * FROM posts WHERE id = $1", [id])

        if (post.rows[0].user_id !== user_id) {
            throw new Error("Не удалось обновить пост нет прав доступа")
        }

        const query = "UPDATE posts SET title = $1, text = $2, tags = $3, avatar_url = $4 WHERE id = $5 RETURNING id"
        const { rows } = await client.query(query, [title, text, tags || [], avatar_url, id])

        return rows[0]
    }

    async deletePost(postId, userId) {

        const post = await client.query("SELECT * FROM posts WHERE id = $1", [postId])

        if (post.rows[0].user_id !== userId) {
            throw new Error("Не удалось удалить пост нет прав доступа")
        }

        const query = "DELETE FROM posts WHERE id = $1 RETURNING id"
        const deletedId = await client.query(query, [postId])

        return deletedId
    }
    async getPosts() {
        const getPostsSql = "SELECT * FROM posts"
        const { rows } = await client.query(getPostsSql)

        return rows || []
    }
    async getPost(id) {
        const getPostSql = "SELECT * FROM posts WHERE id = $1"
        const { rows } = await client.query(getPostSql, [id])

        if (!rows[0]) {
            throw new Error("Статья не найдена")
        }

        return rows[0]
    }
}

export default new PostService()