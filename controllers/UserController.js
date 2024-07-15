import chalk from "chalk"
import AuthService from "../service/AuthService.js"
import UserService from "../service/UserService.js"

class UserController {
    async registration(req, res) {
        try {
            const { email, firstName, lastName, password, avatarUrl } = req.body

            const candidate = await AuthService.registration(email, firstName, lastName, password, avatarUrl)
            console.log(chalk.bgBlue.white(candidate))
            res.json(candidate)
        } catch (error) {
            console.log(error)
            res.status(500).json({ mesage: "Не удалось зарегестрироваться" })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const { candidate, accsessToken } = await AuthService.login(email, password)

            res.json(accsessToken)

        } catch (error) {
            console.log(error)
            res.status(500).json({ mesage: "Не удалось войти", error })
        }
    }

    async getMe(req, res) {
        try {

            const userId = req.userId
            const userData = await AuthService.getMe(userId)
            res.json(userData)
        } catch (error) {
            console.log(error)
            return res.status(404).json({ Message: "Пользователь не найден" })
        }
    }

    async saveAvatar(req, res) {
        try {

            const url = '/uploads/' + req.file.originalname
            const userId = req.userId

            const result = await UserService.saveAvatar(userId, url)

            res.json({
                url,
                result,
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Ошибка сохранения аватарки' })
        }
    }
}

export default new UserController()