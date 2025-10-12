import exprees from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = exprees.Router();

router.get('/token', protectRoute , getStreamToken);



export default router;
