import moment from 'moment';

function generateOtp() {
  const otp = '1234';
  // const expiresAt = moment().add(6, 'minutes').toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  return {
    otp,
    expiresAt
  }
}

export default generateOtp;