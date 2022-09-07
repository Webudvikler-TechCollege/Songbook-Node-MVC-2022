import UserModel from "../Models/user.model.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

class AuthController {
	constructor() {
		console.log('Running authentication');
	}

	login = async (req, res) => {
		const { username, password } = req.body;
		if(username && password) {
			const data = await UserModel.findOne({
				attributes: ['id', 'password'],
				where: { email: username }
			})

			bcrypt.compare(password, data.password, (err, result) => {
				if(result) {
					const token = jwt.sign(data.id, process.env.PRIVATE_KEY)
					return res.json({ token: token })
				} else {
					return res.sendStatus(401)
				}
			})

		}
	}

	protected = async (req, res) => {
		res.sendStatus(200)
	}
}

export { AuthController }