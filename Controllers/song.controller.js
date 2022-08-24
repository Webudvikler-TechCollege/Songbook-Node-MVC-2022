import SongModel from '../Models/song.model.js'

const song = new SongModel;

class SongController {
	constructor() {
		console.log('Instance call of Song Controller');
	}

	list = async (req, res) => {
		const result = await song.getList();
		res.json(result)
	}

	get = async (req, res) => {
		const result = await song.getRecord(req.params.id);
		res.json(result)
	}
}

export { SongController }