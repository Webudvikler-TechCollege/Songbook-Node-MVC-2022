/**
 * Router fil til sync af sequelize modeller
 * Genererer database tabeller ud fra de sequelize modeller som er 
 * importeret 
 */
import express from 'express'
import { sequelize } from '../Config/db.sequelize.js'
const router = express.Router();

// Modeller
import SongModel from '../Models/song.model.js';
import ArtistModel from '../Models/artist.model.js';
import UserModel from '../Models/user.model.js';

// Router
router.get('/init', (req,res) => {
	try {
		sequelize.sync();
		res.sendStatus(200);
	}
	catch(err) {
		res.send(err)
	}
})

export { router }