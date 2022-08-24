import express from 'express';
import dotenv from 'dotenv';
import { router as SongRouter } from './Routes/song.router.js'
import { router as ArtistRouter } from './Routes/artist.router.js'

// Kalder express objekt
const app = express();

// Konfigurerer Node's process.env med vars fra .env fil - bruges til port nummer 
dotenv.config()

// App settings som sikrer at vi kan tilgå form data via request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// App Settings som sikrer CORS adgang via browser
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

// App setting som giver adgang til vores custom routes
app.use(SongRouter);
app.use(ArtistRouter);

// Sæt PORT hvis den findes - ellers 4000
const port = (process.env.PORT || 4000)

// Sætter server til at lytte på en port
app.listen(port, () => {
	console.log(`Server kører på port http://localhost:${port}`);
})