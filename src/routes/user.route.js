import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.deleteById);

export default router