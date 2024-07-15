import TokenService from "../service/TokenService.js";
import ApiError from "../exseptions/ApiError.js";

export default (req, res, next) => {

    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnAnthorizedError())
        }

        const accessToken = (req.headers.authorization).replace(/Bearer\s?/, '');

        if (!accessToken) {
            return next(ApiError.UnAuthorizedError());
        }
        const userData = TokenService.validateToken(accessToken)

        if (!userData) {
            return next(ApiError.UnAuthorizedError());
        }

        req.userId = userData.id
        next()

    } catch (error) {
        return next(ApiError.UnAnthorizedError)
    }

}