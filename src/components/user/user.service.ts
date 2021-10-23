import UserModel from '../../models/user.model';
import { User } from '../../data/user.data';

const createUser = async (user: User): Promise<User> => {
  return await UserModel.create(user);
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
