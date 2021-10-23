import { Router } from 'express';
// import { check } from 'express-validator';
import {
  authLogin,
  getUser
 } from './auth.controller';
import { validarJWT } from '../../middlewares/validar-jwt';

const router = Router();

/**
 * @swagger
 * /api/v1/auth:
 *  get:
 *   summary: Welcome to swagger-jsdoc!
 */
router.post(
  '/login',
  authLogin
);


router.get(
  '/user',
  [
    validarJWT
  ],
  getUser
);

export default router;
