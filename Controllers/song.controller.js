import { Sequelize } from 'sequelize'
import SongModel from '../Models/song.model.js'
import ArtistModel from '../Models/artist.model.js';
const Op = Sequelize.Op;

ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)
class SongController {
	constructor() {
		console.log('Instance call of Song Controller');
	}

	list = async (req, res) => {
		const orderby = [req.query.orderby || 'id']
		orderby.push(req.query.dir || 'ASC')
		const limit = req.query.limit || 1000
		const result = await SongModel.findAll({
			attributes: ['id', 'title'],
			order: [orderby],
			limit: Number(limit),
			include: {
				model: ArtistModel,
				attributes: ['id', 'name']
			}
		})
		res.json(result)
	}

	get = async (req, res) => {
		const result = await SongModel.findAll({
			where: { id: req.params.id},
			attributes: ['id', 'title', 'artist_id'],
		});
		res.json(result)
	}

	search = async(req, res) => {
		const result = await SongModel.findAll({
			where: {
				title: {
					[Op.like]: `%${req.query.keyword}%`
				},
				content: {
					[Op.like]: `%${req.query.keyword}%`
				}

			},
			attributes: ['id', 'title'],
			include: {
				model: ArtistModel,
				attributes: ['id', 'name']
			}
		})
		res.json(result)
	}

	create = async (req, res) => {		
		// Destructure assignment
		const { title, content, artist_id } = req.body

		if(title && content && artist_id) {
			const model = await SongModel.create(req.body)
			res.json({newid: model.id})			
		} else {
			res.sendStatus(418)
		}
	}
}

export { SongController }