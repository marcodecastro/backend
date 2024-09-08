import express from 'express';
import { createOrUpdateMembro } from '../controllers/membroController.js';
import { getMembros } from '../controllers/membroController.js';
import { authenticateToken, checkOwnershipOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, checkOwnershipOrAdmin, createOrUpdateMembro);
router.get('/', authenticateToken, getMembros);

export default router;


