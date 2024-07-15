import PostService from "../service/PostService.js"

class PostController {
    async createPost(req, res) {
        try {
            const { title, text, tags, imagePost: avatar_url } = req.body
            const user_id = req.userId
            const post = await PostService.createPost(title, text, tags, avatar_url, user_id)
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).json({ Message: "Не удалось создать пост" })
        }
    }

    async updatePost(req, res) {
        try {
            const { id } = req.params
            const { title, text, tags, imagePost: avatar_url } = req.body
            const user_id = req.userId

            const updatedPost = await PostService.updatePost(id, title, text, tags, avatar_url, user_id)

            res.json({ message: "Пост обновлен", updatedPost })
        } catch (error) {
            console.log(error)
            res.status(500).json({ Message: "Не удалось обновить пост" })
        }
    }

    async deletePost(req, res) {
        try {
            const { id: postId } = req.params
            const userId = req.userId

            const deletedPost = await PostService.deletePost(postId, userId)
            res.json({ Message: "Пост удален", deletedPost })

        } catch (error) {
            console.log(error)
            res.status(500).json({ Message: "Не удалось удалить пост" })
        }
    }
    async getPosts(req, res) {
        try {
            const posts = await PostService.getPosts()
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Не удалось получить статьи" })
        }
    }
    async getPost(req, res) {
        try {
            const { id } = req.params

            const post = await PostService.getPost(id)

            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Не удалось получить статью" })
        }
    }
}

export default new PostController