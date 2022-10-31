import cron from 'node-cron';
import deleteStaleOtpData from './otp-cron';
import notifyUser from './notification';

export default (): void => {
  cron.schedule('*/2 * * * *', () => {
    deleteStaleOtpData();
  });
  cron.schedule('0 8 * * *', () => {
    notifyUser();
  })
}