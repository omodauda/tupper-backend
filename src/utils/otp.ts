import otpGenerator from 'otp-generator';

function generateOtp() {
  const otp = otpGenerator.generate(5, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  })
  // const expiresAt = moment().add(6, 'minutes').toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  return {
    otp,
    expiresAt
  }
}

export default generateOtp;