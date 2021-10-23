import jwt from 'jsonwebtoken';
import environment from '../config/environments/environment';
const generalJWT = (uid: string): string => {
    const payload = {
        uid,
    };
    const token = jwt.sign({
        payload
      }, environment.JWT_SECRET, { expiresIn: '12h' });

    return token;
}

const generalJwtActiveUser = (uid: string): string => {
    const payload = {
        uid,
    };
    const token = jwt.sign({
        payload
      }, environment.JWT_SECRET, { expiresIn: '5m' });

    return token;
}



export {
    generalJWT,
    generalJwtActiveUser
};