import express from 'express';
import { router as SongRouter } from './Routes/song.router.js'

const app = express();

// App Settings to ensure CORS Access from browser
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.use(SongRouter);

app.listen(4000, () => {
	console.log('Server kører på port http://localhost:4000');
})