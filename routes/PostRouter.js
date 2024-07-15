import { Router } from "express";
import PostController from "../controllers/PostController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationsErrors from "../utils/handleValidationsErrors.js";
import { postCreateValidation } from "../validations/post.js";

const router = Router();

router.get('/posts', PostController.getPosts)
router.get('/posts/:id', PostController.getPost)
router.post("/posts", [checkAuth, postCreateValidation, handleValidationsErrors], PostController.createPost)
router.put("/posts/:id", [checkAuth], PostController.updatePost)
router.delete('/posts/:id', [checkAuth], PostController.deletePost)

export { router as postRouter }