import { User } from '@prisma/client';
import HttpException from '../utils/handlers/error.handler';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import generateOtp from 'utils/otp';

export default class UserService {
  public users = prisma.user;

  public async createUser(name: string, email: string, password: string, zipCode: string) {
    const existingEmail = await this.users.findUnique({ where: { email } });

    if (existingEmail) throw new HttpException(409, `user with email ${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, expiresAt } = generateOtp();

    return await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          zipCode
        }
      })
      await tx.otp.create({
        data: {
          userId: newUser.id,
          otp,
          expiresAt
        }
      })
    })
  }

  public async login(email: string, password: string): Promise<User> {
    const existingUser = await this.users.findUnique({ where: { email } });
    if (!existingUser) throw new HttpException(409, 'invalid email/password');

    const isValidPassword: boolean = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) throw new HttpException(401, 'invalid email/password');

    return existingUser;
  }
}