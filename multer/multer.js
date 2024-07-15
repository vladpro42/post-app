import multer from "multer"

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })
