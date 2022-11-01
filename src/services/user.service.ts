import { User } from '@prisma/client';
import HttpException from '../utils/handlers/error.handler';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import generateOtp from '../utils/otp';
import moment from 'moment';
import { sendVerificationEmail } from '../utils/email';

export default class UserService {
  public users = prisma.user;
  public otps = prisma.otp;

  private async isRegisteredUser(email: string) {
    return await this.users.findUnique({
      where: {
        email
      }
    });
  }

  public async createUser(name: string, email: string, password: string, zipCode: string) {
    const existingEmail = await this.isRegisteredUser(email);
    if (existingEmail) throw new HttpException(409, `user with email ${email} already exist`);

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

  // public async verifyUser(email: string, otp: string) {
  //   const registeredUser = await this.isRegisteredUser(email)
  //   if (!registeredUser) throw new HttpException(400, `user with email ${email} is not registered`);

  //   if (registeredUser.isVerified) {
  //     throw new HttpException(400, `user already verified`);
  //   }

  //   const userOtpData = await this.otps.findUnique({ where: { userId: registeredUser.id } });
  //   const now = moment();

  //   if (userOtpData?.otp !== otp) {
  //     throw new HttpException(400, 'invalid verification code')
  //   } else if (now.isAfter(userOtpData.expiresAt)) {
  //     throw new HttpException(400, 'verification code expired')
  //   }
  //   await this.users.update({ where: { id: registeredUser.id }, data: { isVerified: true } })
  // }

  public async login(email: string, password: string): Promise<User> {
    const existingUser = await this.isRegisteredUser(email)
    if (!existingUser) throw new HttpException(409, 'invalid email/password');

    const isValidPassword: boolean = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) throw new HttpException(401, 'invalid email/password');

    return existingUser;
  }

  public async forgetPassword(email: string): Promise<void> {
    const registeredUser = await this.isRegisteredUser(email);
    if (!registeredUser) throw new HttpException(409, `Email ${email} is not registered`)

    const { otp, expiresAt } = generateOtp();
    // create otp record
    await this.otps.create({ data: { userId: registeredUser.id, otp, expiresAt } });
    // send otp
    sendVerificationEmail(registeredUser.name, email, otp);
  }

  public async resendResetOtp(email: string) {
    const registeredUser = await this.isRegisteredUser(email);
    if (!registeredUser) throw new HttpException(400, `user with email ${email} is not registered`);
    // if (registeredUser.isVerified) {
    //   throw new HttpException(400, `user already verified`);
    // }
    const { otp, expiresAt } = generateOtp();

    // create otp record
    await this.otps.create({ data: { userId: registeredUser.id, otp, expiresAt } });
    // send otp
    sendVerificationEmail(registeredUser.name, email, otp);
  }

  public async resetPassword(email: string, otp: string, password: string): Promise<void> {
    const registeredUser = await this.isRegisteredUser(email);
    if (!registeredUser) throw new HttpException(409, `Email ${email} is not registered`)

    const userOtpData = await this.otps.findUnique({ where: { userId: registeredUser.id } });
    if (!userOtpData) {
      throw new HttpException(400, 'otp code expired')
    }
    const now = moment();

    if (userOtpData?.otp !== otp) {
      throw new HttpException(400, 'invalid otp code')
    } else if (now.isAfter(userOtpData.expiresAt)) {
      throw new HttpException(400, 'otp code expired')
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.users.update({ where: { id: registeredUser.id }, data: { password: hashedPassword } })
  }

  public async saveNotificationToken(userId: string, token: string) {
    await this.users.update({
      where: {
        id: userId,
      },
      data: {
        notificationToken: token
      }
    })
  }

  public async removeNotificationToken(userId: string) {
    await this.users.update({
      where: {
        id: userId,
      },
      data: {
        notificationToken: null
      }
    })
  }
}