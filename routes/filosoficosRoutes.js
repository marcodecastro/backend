import express from 'express';
import { body } from 'express-validator';
import { createOrUpdateFilosoficos } from '../controllers/filosoficosController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authenticateToken, checkOwnershipOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  [
    body('cim').isLength({ min: 1 }).withMessage('CIM é obrigatório.'),
    body('graus_filosoficos.*.grau').isLength({ min: 1 }).withMessage('Grau é obrigatório.'),
    body('graus_filosoficos.*.data').isISO8601().toDate().withMessage('Data inválida.'),
    body('graus_filosoficos.*.descricao').isLength({ min: 1 }).withMessage('Descrição é obrigatória.'),
  ],
  validateRequest,
  checkOwnershipOrAdmin,
  createOrUpdateFilosoficos
);

export default router;

