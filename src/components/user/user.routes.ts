import { Router } from 'express';
// import { check } from 'express-validator';
import {
  createUser,
  getUsers,
  getUserById,
  getUserBySlug,
  deleteUserById,
  updateUserById
} from './user.controller';
import { validarADMIN } from '../../middlewares/validar-admin';
import { validarJWT } from '../../middlewares/validar-jwt';

const router = Router();

router.post(
  '/',
  createUser
);

router.get(
  '/',
  [
    validarJWT,
    validarADMIN
  ],
  getUsers
);

router.get(
  '/:id',
  [
    validarJWT,
    validarADMIN
  ],
  getUserById
);

router.put(
  '/:id',
  [
    //validarJWT,
    //validarADMIN
  ],
  updateUserById
);

router.get(
  '/slug/:slug',
  [
    //validarJWT,
    //validarADMIN
  ],
  getUserBySlug
);

router.delete(
  '/id',
  [
    //validarJWT,
    //validarADMIN
  ],
  deleteUserById
);

export default router;
