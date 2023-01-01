import prisma from '../lib/prisma';

async function deleteStaleOtpData(): Promise<void> {
  const now = new Date(Date.now());
  await prisma.otp.deleteMany({
    where: {
      expiresAt: {
        lt: now
      }
    }
  })
}

export default deleteStaleOtpData;