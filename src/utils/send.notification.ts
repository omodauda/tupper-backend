import admin from 'firebase-admin';
import prisma from '../lib/prisma';

interface Noitification {
  userId: string;
  title: string;
  body: string;
  data?: { [key: string]: string }
}

async function sendNotification(data: Noitification) {
  const Messaging = admin.messaging();
  const user = await prisma.user.findUnique({ where: { id: data.userId } });
  const notification = {
    title: data.title,
    body: data.body,
  };

  // store notification to db

  const message: admin.messaging.TokenMessage = {
    notification,
    data: data.data,
    token: user?.notificationToken!,
    android: {
      priority: 'high'
    },
  }

  if (user?.notificationToken === null) {
    return;
  }
  await Messaging.send(message);

  // store successStr
}

export default sendNotification;