import express from 'express';
import { ArtistController } from '../Controllers/artist.controller.js';

// Kalder instans af artist controller
const controller = new ArtistController();

// Sætter router objekt fra express
const router = express.Router();

// Peger routes på metoder i controller
router.get('/artist', (req, res) => { controller.list(req,res) })
router.get('/artist/:id([0-9]*)', (req, res) => { controller.get(req,res) })
router.post('/artist', (req, res) => { controller.create(req,res) })

export { router }