import express from 'express';
import libraryController from '../controllers/library.controller.js';

const router = express.Router();

router.post('/', libraryController.create);
router.get('/', libraryController.getAll);
router.get('/:id', libraryController.getId);
router.patch('/:id', libraryController.update);
router.delete('/:id', libraryController.deletedId);

export default router;