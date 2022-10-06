import { User } from '@prisma/client';
import HttpException from '../utils/handlers/error.handler';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

export default class UserService {
  public users = prisma.user;

  public async createUser(name: string, email: string, password: string,): Promise<User> {
    const existingEmail = await this.users.findUnique({ where: { email } });

    if (existingEmail) throw new HttpException(409, `user with email ${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.users.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}