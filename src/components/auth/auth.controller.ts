import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { generalJWT } from '../../helpers/jwt';
import ErrorHandler from '../../helpers/error';
import userService from '../user/user.service';
import ResponseHandler from '../../helpers/response';

const authLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);

    if(!user){
      return ErrorHandler(req, res, 404, 'No se encontró un usuario con ese email');
    }

    // Validar password
    const validPassword = compareSync(password, user.password as string);
    console.log('123123', validPassword);
    if( !validPassword ){
      return ErrorHandler(req, res, 400, 'El usuario con ese password no existe');
    }

    // Generar token - JWT
    const token = generalJWT(user.email);
    ResponseHandler(req, res, 200, {
      ok: true,
      token
    })
  } catch (error) {
    console.log(error);

    ErrorHandler(req, res, 500, 'Error al logear usuario');
  }
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  const email = res.locals.uid;
  try {
      const user = await userService.getUserByEmail(email);
      ResponseHandler(req, res, 200, {
        ok: true,
        user
      })
  } catch (error) {
      ErrorHandler(req, res, 500, 'Error al devolver datos del usuario')
  }
}

export {
  authLogin,
  getUser
}
