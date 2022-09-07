import express from 'express';
import { AuthController } from '../Controllers/auth.controller.js';
import verifyToken from '../Middleware/verifyToken.js';

// Kalder instans af controller
const controller = new AuthController();

// Sætter router objekt fra express
const router = express.Router();

// Peger routes på metoder i controller
router.post('/login', (req, res) => { controller.login(req,res) })
router.get('/protected', verifyToken, (req, res) => { controller.protected(req,res) })

export { router }