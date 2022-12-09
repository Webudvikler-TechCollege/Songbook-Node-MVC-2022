import ArtistModel from '../Models/artist.model.js'

class ArtistController {
	// Constructor - kaldes med instans af klassen
	constructor() {
		console.log('Instance call of Artist Controller');
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
		const result = await ArtistModel.findAll({
			// Sorteringsnøgle
			order: [orderby],
			// Begrænsning
			limit: Number(limit)
		})
		// Parser resultat som json
		res.json(result)
	}

	// Metode get - henter record ud fra id
	get = async (req, res) => {
		// Sætter resultat efter sq metode
		const result = await ArtistModel.findAll({
			// Where clause
			where: { id: req.params.id}
		});
		// Parser resultat som json
		res.json(result)
	}

	// Metode create - opretter sang
	create = async (req, res) => {		
		// Destructure assignment - parser vars fra req.body obj over i single vars
		const { name } = req.body
		// Hvis name er true
		if(name) {
			// Opretter record med sq metode
			const model = await ArtistModel.create(req.body)
			// Parser nyt id som json
			res.json({newid: model.id})			
		} else {
			// Sender teapot fejlkode
			res.sendStatus(418)
		}
	}
}

export { ArtistController }