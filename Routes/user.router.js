import express from 'express';
import { UserController } from '../Controllers/user.controller.js';

// Kalder instans af artist controller
const controller = new UserController();

// Sætter router objekt fra express
const router = express.Router();

// Peger routes på metoder i controller
router.get('/user', (req, res) => { controller.list(req,res) })
router.get('/user/:id([0-9]*)', (req, res) => { controller.get(req,res) })
router.post('/user', (req, res) => { controller.create(req,res) })
router.put('/user/:id([0-9]*)', (req, res) => { controller.update(req,res) })
router.delete('/user/:id([0-9]*)', (req, res) => { controller.delete(req,res) })

export { router }