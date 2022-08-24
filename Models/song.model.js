import db from '../Config/db.config.js'

class SongModel {
	constructor() {
		console.log('Instance call of Song Model');
	}

	getList = (req, res) => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM song";
			db.query(sql, (err, result) => {
				if(err) {
					reject(res.send(err))
				} else {
					//console.log(result);
					resolve(result)
				}
			})			
		})
	}

	getRecord = id => {
		return new Promise((resolve, reject) => {
			const sql = "SELECT * FROM song WHERE id = ?";
			db.query(sql, id, (err, result) => {
				if(err) {
					reject(err)
				} else {
					resolve(result)
				}
			})

		})
	}
}

export default SongModel