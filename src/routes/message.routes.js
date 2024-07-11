import express from 'express';
import messageController from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send', messageController.sendMessage);
router.get('/:roomId', messageController.getMessages);

export default router;
