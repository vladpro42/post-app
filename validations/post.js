import { body } from "express-validator";

export const postCreateValidation = [
    body('title').isLength({ min: 3, max: 2000 }),
    body('text').isLength({ min: 3 }),
    body('tags').optional().default([]),
    body('avatarUrl').optional().isURL(),
]
