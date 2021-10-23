import UserModel from '../../models/user.model';
import { User } from '../../data/user.data';
import { uid } from 'uid';

import { genSaltSync, hashSync } from 'bcrypt';
import slug from 'slug';
const saltRounds = 10;

const createUser = async (user: User): Promise<User> => {
  return await UserModel.create({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: hashSync(user.password as string, genSaltSync(saltRounds)),
    img: `https://ui-avatars.com/api/?name=${user.name}+${user.lastname}`,
    slug: `${slug(user.name)}-${slug(user.lastname)}-${uid(6)}`,
  });
}

const getUsers = async (desde: number, limit: number, search: string): Promise<User> => {
  const regex = new RegExp(search, 'i');
  return await UserModel.find({
    $or: [
      { email: regex },
      { name: regex },
    ]
  }).skip(desde).limit(limit).sort({ created_at: -1 });
};

const getUserById = async (id: string): Promise<User> => await UserModel.findById(id);

const getUserByEmail = async (email: string): Promise<User> => await UserModel.findOne({email});

const getUserBySlug = async (slug: string): Promise<User> => await UserModel.findOne({slug});

const countUsers = async (): Promise<number> => await UserModel.countDocuments();

const updateUserById = async (user: User, id: string): Promise<User> => await UserModel.findByIdAndUpdate(id, user, {new: true});

const deleteUser = async (id: string): Promise<number> => await UserModel.findByIdAndDelete(id);

export default {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  countUsers,
  deleteUser,
  updateUserById,
  getUserBySlug
}
