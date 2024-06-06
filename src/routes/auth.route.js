import express from 'express';
import authController from '../controllers/auth.controller.js';

const routerAuth = express.Router();

routerAuth.post('/', authController.auth);

export default routerAuth;