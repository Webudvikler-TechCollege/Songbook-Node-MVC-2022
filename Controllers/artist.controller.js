import { Sequelize } from 'sequelize'
import ArtistModel from '../Models/artist.model.js'

class ArtistController {
	constructor() {
		console.log('Instance call of Artist Controller');
	}

	list = async (req, res) => {
		const orderby = [req.query.orderby || 'id']
		orderby.push(req.query.dir || 'ASC')
		const limit = req.query.limit || 1000
		const result = await ArtistModel.findAll({
			attributes: ['id', 'name'],
			order: [orderby],
			limit: Number(limit)
		})
		res.json(result)
	}

	get = async (req, res) => {
		const result = await ArtistModel.findAll({
			where: { id: req.params.id}
		});
		res.json(result)
	}

	create = async (req, res) => {		
		// Destructure assignment
		const { name } = req.body

		if(name) {
			const model = await ArtistModel.create(req.body)
			res.json({newid: model.id})			
		} else {
			res.sendStatus(418)
		}
	}
}

export { ArtistController }