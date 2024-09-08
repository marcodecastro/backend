import express from 'express';
import { registerMembro, loginMembro, validateUser  } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router(); 

router.post(
  '/register',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('cim').notEmpty().withMessage('CIM é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    validateRequest,
  ],
  registerMembro
);

router.post(
  '/login',
  [
    body('cim').notEmpty().withMessage('CIM é obrigatório'),
    body('senha').notEmpty().withMessage('Senha é obrigatória'),
    body('email').isEmail().withMessage('Email inválido'),
    validateRequest,
  ],
  loginMembro
);

// Rota para validação do usuário autenticado
router.get('/validate', authenticateToken, validateUser);


export default router;
