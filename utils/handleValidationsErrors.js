import { validationResult } from "express-validator"
import ApiError from "../exseptions/ApiError.js"

export default (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return ApiError.BadRequest("Ошибка при валидации", errors.array())
    }

    next()
}