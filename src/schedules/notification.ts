import moment from 'moment';
import prisma from '../lib/prisma';
import sendNotification from '../utils/send.notification';

interface Noitification {
  userId: string;
  title: string;
  body: string;
  data?: { [key: string]: string }
}

async function notifyUser() {
  const today = moment();
  const expiredFood = await prisma.foodItem.findMany({
    where: {
      expiryDate: {
        equals: today.format('YYYY-MM-DD').toLocaleString(),
      }
    }
  });

  expiredFood.forEach(async (food) => {
    const data: Noitification = {
      userId: food.userId,
      title: 'Food expired',
      body: `${food.quantity} ${food.name} in your inventory has expired`
    }
    await sendNotification(data)
  })
}

export default notifyUser;