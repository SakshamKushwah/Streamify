import exprees from 'express';
import { protectRoute } from '../middleware/auth.middleware';

const router = exprees.Router();

router.get('/token', protectRoute , getStreamToken)



export default router;
