import UserModel from "../Models/user.model.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// Kalder miljø vars
dotenv.config()

class AuthController {
	/**
	 * Class Constructor
	 */
	constructor() {
		console.log('Running authentication');
	}

	/**
	 * Metode til håndtering af login
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	login = async (req, res) => {
    	// Destructure Assignment - parser properties over i single vars
		const { username, password } = req.body;
		if(username && password) {
			// Henter db user id & password ud fra username
			const data = await UserModel.findOne({
				attributes: ['id', 'password'],
				where: { email: username }
			})

			// Validerer passwords
			bcrypt.compare(password, data.password, (err, result) => {
				if(result) {
			        // Genererer token ud fra user_id og secret key
					const token = jwt.sign(data.id, process.env.PRIVATE_KEY)
					return res.json({ token: token })
				} else {
					return res.sendStatus(401) // Unauthorized
				}
			})

		}
	}

	/**
	 * Metode til test af protected route
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	protected = async (req, res) => {
		res.sendStatus(200) // Ok
	}
}

export { AuthController }