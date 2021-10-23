export enum Role {
  user = 'user_role',
  admin = 'admin_role'
}

export interface User {
  _id?: string,
  name: string,
  lastname: string,
  email: string,
  password?: string,
  status: boolean,
  img: string,
  role: Role,
  slug: string,
  google?: boolean,
  created_at: Date,
  updated_at: Date,
}