import express from 'express';
import { SongController } from '../Controllers/song.controller.js';

// Kalder instans af song controller
const controller = new SongController();

// Sætter router objekt fra express
const router = express.Router();

// Peger routes på metoder i controller
router.get('/song', (req, res) => { controller.list(req,res) })
router.get('/song/:id([0-9]*)', (req, res) => { controller.get(req,res) })
router.get('/song/search', (req, res) => { controller.search(req,res) })
router.post('/song', (req, res) => { controller.create(req,res) })

export { router }