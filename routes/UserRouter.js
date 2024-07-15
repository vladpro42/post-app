import { Router } from "express";
import { loginValidation, registerValidation } from "../validations/auth.js";
import UserController from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationsErrors from "../utils/handleValidationsErrors.js";
import { upload } from "../multer/multer.js";

const router = Router();

router.post("/register", registerValidation, handleValidationsErrors, UserController.registration)
router.post("/login", loginValidation, handleValidationsErrors, UserController.login)
router.get('/me', checkAuth, UserController.getMe)
router.post('/save-avatar', checkAuth, upload.single('avatar'), UserController.saveAvatar)

export { router as userRouter }