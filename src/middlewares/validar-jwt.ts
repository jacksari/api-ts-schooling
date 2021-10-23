import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import environment from '../config/environments/environment';
import ErrorHandler from './error';

const validarJWT = (req: Request, res: Response, next: NextFunction): void => {

    // Leer el token
    const token = req.header('x-token');
    // console.log(token);
    if(!token) {
        return ErrorHandler(req, res, 401, 'No hay token en la petición');
    }
    try {
        const tk = jwt.verify(token, environment.JWT_SECRET);
        
        const tk1 = tk as JwtPayload;
        res.locals.uid = tk1.payload.uid;
        next();
    } catch (error) {
        //console.log(error);
        ErrorHandler(req, res, 401, 'Token incorrecto');
    }

    
}

const validarJwtActiveUser = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.query.token;

    // console.log(token);
    if(!token) {
        return ErrorHandler(req, res, 401, 'No hay token en la petición');
    }
    try {
        //const { payload: { uid } } = jwt.verify(token as string, environment.JWT_SECRETT);
        // console.log(uid);
        //req.uid_user_active  = uid;
        next();
    } catch (error) {
        //console.log(error);
        ErrorHandler(req, res, 401, 'Token incorrecto');
    }

    
}


export {
    validarJWT,
    validarJwtActiveUser
}