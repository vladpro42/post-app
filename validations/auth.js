import { body } from "express-validator";

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("firstName").notEmpty().isLength({ max: 200 }),
    body("lastName").notEmpty().isLength({ max: 200 }),
    body("avatar_url").optional().isURL(),
]
export const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
]

