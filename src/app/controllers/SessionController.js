import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        const checkEmailOrPasswordIncorrect = () => {
            return response
                .status(401)
                .json({ error: "Make sure your email or password are correct" })
        }

        if (!(await schema.isValid(request.body))) checkEmailOrPasswordIncorrect()

        const { email, password } = request.body

        const user = await User.findOne({
            where: { email }
        })

        if (!user) checkEmailOrPasswordIncorrect()

        if (!(await user.checkPassword(password))) checkEmailOrPasswordIncorrect()

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secretKey, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}

export default new SessionController()