import express from 'express';
import { router as SongRouter } from './Routes/song.router.js'
import { router as ArtistRouter } from './Routes/artist.router.js'

const app = express();

// App settings to provide access to request body data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// App Settings to ensure CORS Access from browser
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.use(SongRouter);
app.use(ArtistRouter);

app.listen(4000, () => {
	console.log('Server kører på port http://localhost:4000');
})