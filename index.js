import express from "express"
import { client } from "./db.js"
import { userRouter } from "./routes/UserRouter.js"
import { postRouter } from "./routes/PostRouter.js"
import chalk from "chalk"
import checkAuth from "./utils/checkAuth.js"
import { upload } from "./multer/multer.js"
import MulterController from "./controllers/MulterController.js"
import cors from "cors"
const app = express()


try {
    await client.connect()
    const res = await client.query('SELECT $1::text as mesage', ['succsesful conenction db'])
    console.log(res.rows[0])
} catch (error) {
    console.log(chalk.bgRed.white("не удалось подключиться к бд", error))
}

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('./uploads'))

const PORT = 4444


app.use("/auth", userRouter)
app.use("/", postRouter)

app.post('/upload', checkAuth, upload.single('image'), MulterController.send)
app.get('/', (req, res) => res.send("Hello world!"))


















app.listen(PORT, () => {
    console.log(chalk.bgGreen.white("Сервер стартовал на порту:"), chalk.yellow.bold(PORT))
})

export default app