import { Router } from 'express';
import { sendTextMessage, uploadFile } from '../controllers/meta.controller.js';

const router = Router();

router.post('/send-text', sendTextMessage);
router.post('/upload-file', uploadFile);

export default router;
