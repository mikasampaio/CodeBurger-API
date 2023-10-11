import jwt from "jsonwebtoken";
import auth from "../../config/auth";

export default (request, response, next) => {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ error: "Token not provided" })
    }

    const token = authToken.split(" ")[1]

    try {
        jwt.verify(token, auth.secretKey, function (err, decoded) {
            if (err) {
                throw new Error()
            }

            request.userId = decoded.id
            request.userName = decoded.name

            return next()

        })
    } catch (err) {
        return response.status(401).json({ error: "Token is invalid" })
    }


}