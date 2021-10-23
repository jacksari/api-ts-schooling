import { Request, Response } from 'express';
import ErrorHandler from '../../helpers/error';
import userService from './user.service';
import { User } from '../../data/user.data';
import { genSaltSync, hashSync } from 'bcrypt';
import slug from 'slug';
import { uid } from 'uid';
import ResponseHandler from '../../helpers/response';

const saltRounds = 10;


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: User = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashSync(req.body.password as string, genSaltSync(saltRounds)),
      img: `https://ui-avatars.com/api/?name=${req.body.name}+${req.body.lastname}`,
      slug: `${slug(req.body.name)}-${slug(req.body.lastname)}-${uid(6)}`,
    }
    const user = await userService.createUser(newUser)
    ResponseHandler(req, res, 200, user)
  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al crear usuario');
  }
}

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 2;
  const page = parseInt(req.query.page as string) || 1;
  const search = req.query.search as string || '';
  const desde =  limit * (page - 1 );
  console.log('QWEQWE', res.locals.uid);

  try {
    const users = await userService.getUsers(desde, limit, search);
    const total = await userService.countUsers();
    ResponseHandler(req, res, 200, {
      page,
      per_page: limit,
      total,
      total_page: Math.ceil(total/limit),
      users
    });
  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al listar usuarios')
  }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if(!user){
      return ErrorHandler(req, res, 404, 'No existe un usuario con ese id');
    }
    ResponseHandler(req, res, 200, user);
  } catch (error) {
    ErrorHandler(req, res, 500 , 'Error al lista usuario');
  }
}

const getUserBySlug = async(req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserBySlug(req.params.slug);
    if(!user){
      return ErrorHandler(req, res, 404, 'No existe un usuario con ese slug');
    }
    ResponseHandler(req, res, 200, user);

  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al listar usuario por slug');
  }
}

const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if(!user){
      return ErrorHandler(req, res, 404, 'No existe un usuario con ese id');
    }

      const { password, google, email, ...content } = req.body;
      const campos: User = content;

      if( user.email !== email ){
          const existeEmail = await userService.getUserByEmail(email);
          if( existeEmail ) {
              return  ErrorHandler(req, res, 400, 'Ya existe un usuario con ese correo')
          }
      }
      campos.updated_at = new Date();
      campos.email = email;
      //console.log('123',campos);

      const newUser = await userService.updateUserById(campos,user._id  as string);

      ResponseHandler(req, res, 200, {
        user: newUser,
        ok: true
      })

  } catch (error) {
      console.log(error);
      return ErrorHandler(req, res, 500, 'Error al actualizar categoría')
  }

}

const deleteUserById = async(req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if(!user){
      return ErrorHandler(req, res, 404, 'No existe un usuario con ese slug');
    }
    await userService.deleteUser(user._id as string);
    ResponseHandler(req, res, 200, {
      msg: 'Usuario eliminado',
      ok: true
    })
  } catch (error) {
    ErrorHandler(req, res, 500, 'Error al listar usuario por slug');
  }
}

export {
  createUser,
  getUsers,
  getUserById,
  getUserBySlug,
  deleteUserById,
  updateUserById
}
