import { Schema, model } from 'mongoose';
import { Role, User } from '../data/user.data';

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: Role.user
  },
  google: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
}, { collection: 'users' });

UserSchema.method('toJSON', function () {
  //const { __v, _id, ...object } = this.toObject();
  const { _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default model('User', UserSchema);
