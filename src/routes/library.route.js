import express from 'express';
import libraryController from '../controllers/library.controller.js';
import { validarJWT } from '../middleware/validarToken.middleware.js';

const router = express.Router();

router.post('/',validarJWT, libraryController.create);
router.get('/', libraryController.getAll);
router.get('/:id', libraryController.getId);
router.patch('/:id', libraryController.update);
router.delete('/:id', libraryController.deletedId);

export default router;