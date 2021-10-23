import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import environment from '../config/environments/environment';
import ErrorHandler from './error';
import userService from '../components/user/user.service';

const validarADMIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    // Leer el token
    const token = req.header('x-token');
    // console.log(token);
    if(!token) {
        return ErrorHandler(req, res, 404, 'No hay token en la petición');
    }
    try {
        const tk = jwt.verify(token, environment.JWT_SECRET);
        const tk1 = tk as JwtPayload;
        const user = await userService.getUserByEmail(tk1.payload.uid)
        if(!user){
          return ErrorHandler(req,res ,400, 'No existe usuario con ese correo');
        }
        if(user.role === 'admin_role'){
          return next();
        } else{
          return ErrorHandler(req,res ,400, 'El usuario no es administrador');
        }

    } catch (error) {
        //console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }


}


export {
  validarADMIN
}
