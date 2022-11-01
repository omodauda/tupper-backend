import cron from 'node-cron';
import deleteStaleOtpData from './otp-cron';

export default (): void => {
  cron.schedule('*/2 * * * *', () => {
    deleteStaleOtpData();
  });
}