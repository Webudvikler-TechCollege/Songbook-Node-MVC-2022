import UserModel from '../Models/user.model.js'

class UserController {
	/**
	 * Class Constructor
	 */
	constructor() {
		console.log('Instance call of User Controller');
	}

	/**
	 * List Metode - henter alle brugere
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	list = async (req, res) => {
		const result = await UserModel.findAll()
		res.json(result)
	}

	/**
	 * Get Metode - henter brugers detaljer ud fra id
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */
	 get = async (req, res) => {
		const result = await UserModel.findOne({
			where: { id: req.params.id }
		})
		res.json(result)
	}

	/**
	 * Create Metode - opretter ny bruger
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 * @return {number} Returnerer nyt id
	 */
	create = async (req, res) => {
		const { firstname, lastname, email, password } = req.body

		if(firstname && lastname && email && password) {
			const model = await UserModel.create(req.body)
			return res.json({newId: model.id})
		} else {
			res.send(418)
		}
	}

	/**
	 * Update Metode - opdaterer bruger
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	update = async (req, res) => {
		const { firstname, lastname, email, password } = req.body

		if(firstname && lastname && email && password) {
			const model = await UserModel.update(req.body, {
				where: {id: req.params.id},
				individualHooks: true
			})
			return res.json({status: true})
		} else {
			res.send(418)
		}
	}

	/**
	 * Delete Metode - sletter bruger ud fra id i url parameter
	 * @param {object} req Request Object
	 * @param {object} res Response Object
	 */	
	delete = async (req, res) => {
		try {
			await UserModel.destroy({ 
				where: { id: req.params.id }
			})
			res.sendStatus(200)
		}
		catch(err) {
			res.send(err)
		}
	}


}

export { UserController }