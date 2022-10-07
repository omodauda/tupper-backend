import moment from 'moment';

function generateOtp() {
  const otp = '1234';
  const expiresAt = moment().add(6, 'minutes').toString();
  return {
    otp,
    expiresAt
  }
}

export default generateOtp;