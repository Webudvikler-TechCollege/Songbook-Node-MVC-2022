import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Middleware til bekræftelse af jsonwebtoken string
 * @param {Object} req Request Object
 * @param {Object} res Response Object
 * @param {Object} next Middleware Control Function
 */
const verifyToken = (req, res, next) => {
	// Henter bearer token fra authorization header
	const bearerHeader = req.headers['authorization']
	// Tjekker at bearer har en valid værdi
	if(typeof bearerHeader !== 'undefined') {
		// Splitter token string fra bearer og assigner token string til var
		const requestToken = bearerHeader.substr(7) // Remove "Bearer "

		// Validerer token op mod .env private key
		jwt.verify(requestToken, process.env.PRIVATE_KEY, (err, data) => {
			if(!err) {
				// Kalder næste control i request/response cyclussen
				next()
			} else {
				// Melder forbidden status
				res.sendStatus(403)
			}
		})
	} else {
		// Melder unauthorized status
		res.sendStatus(401)
	}
}

export default verifyToken