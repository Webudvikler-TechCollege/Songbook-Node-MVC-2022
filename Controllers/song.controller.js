import { Sequelize } from 'sequelize'
import SongModel from '../Models/song.model.js'
import ArtistModel from '../Models/artist.model.js';

// Kalder sq Operator til search clause
const Op = Sequelize.Op;

// Sætter modellers relationelle forhold - een til mange
ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)
class SongController {
	// Constructor - kaldes med instans af klassen
	constructor() {
		console.log('Instance call of Song Controller');
	}

	// Metode list - henter alle records
	list = async (req, res) => {
		// Sætter sorteringsnøgle efter GET vars: url?orderby=title
		const orderby = [req.query.orderby || 'id']
		// Sætter sorteringsretning efter GET vars: url?dir=DESC
		orderby.push(req.query.dir || 'ASC')
		// Sætter begrænsning efter GET vars: url?limit=5
		const limit = req.query.limit || 1000
		// Sætter resultat efter sq metode
		const result = await SongModel.findAll({
			// Definerer array med felter
			attributes: ['id', 'title'],
			// Sorteringsnøgle
			order: [orderby],
			// Begrænsning
			limit: Number(limit),
			// Inkluderer relationelle data fra artist via id
			include: {
				model: ArtistModel,
				attributes: ['id', 'name']
			}
		})
		// Parser resultat som json
		res.json(result)
	}

	// Metode get - henter record ud fra id
	get = async (req, res) => {
		// Sætter resultat efter sq metode
		const result = await SongModel.findAll({
			// Where clause
			where: { id: req.params.id},
			attributes: ['id', 'title', 'artist_id'],
		});
		// Parser resultat som json
		res.json(result)
	}

	// Metode search - returnerer records ud fra en funden søgestreng
	search = async(req, res) => {
		// Sætter resultat med sq metode
		const result = await SongModel.findAll({
			// where clause
			where: {
				// Søg på titel
				title: {
					[Op.like]: `%${req.query.keyword}%`
				},
				// Søg på titel
				content: {
					[Op.like]: `%${req.query.keyword}%`
				} 
			},
			// Attributter: array med felter
			attributes: ['id', 'title'],
			// Inkluderer relationelle data fra artist via id
			include: {
				model: ArtistModel,
				attributes: ['id', 'name']
			}
		})
		// Parser result som json
		res.json(result)
	}

	create = async (req, res) => {		
		// Destructure assignment - parser vars fra req.body obj over i single vars
		const { title, content, artist_id } = req.body
		// Hvis vars er true
		if(title && content && artist_id) {
			// Opretter record med sq metode
			const model = await SongModel.create(req.body)
			// Parser nyt id som json
			res.json({newid: model.id})			
		} else {
			// Sender teapot fejlkode
			res.sendStatus(418)
		}
	}
}

export { SongController }