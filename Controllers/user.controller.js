import { Sequelize } from 'sequelize'
import UserModel from '../Models/user.model.js'

class UserController {
	// Constructor - kaldes med instans af klassen
	constructor() {
		console.log('Instance call of User Controller');
	}

	list = async (req, res) => {
		const result = await UserModel.findAll()
		res.json(result)
	}

	get = async (req, res) => {
		const result = await UserModel.findOne({
			where: { id: req.params.id }
		})
		res.json(result)
	}

	create = async (req, res) => {
		const { firstname, lastname, email, password } = req.body

		if(firstname && lastname && email && password) {
			const model = await UserModel.create(req.body)
			return res.json({newId: model.id})
		} else {
			res.send(418)
		}
	}

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