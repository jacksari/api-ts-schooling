import { Request, Response } from 'express';
import ErrorHandler from '../../middlewares/error';
import userService from './user.service';
import { User } from '../../data/user.data';


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json({
      ok: true,
      user
    })
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
    res.status(200).json({
      ok: true,
      page,
      per_page: limit,
      total,
      total_page: Math.ceil(total/limit),
      users
    })
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
    res.status(200).json({
      ok: true,
      user
    })
  } catch (error) {
    ErrorHandler(req, res, 500 , 'Error al lista usuario')
  }
}

const getUserBySlug = async(req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserBySlug(req.params.slug);
    if(!user){
      return ErrorHandler(req, res, 404, 'No existe un usuario con ese slug');
    }
    res.status(200).json({
      ok: true,
      user
    })
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

      res.json({
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
    res.json({
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
