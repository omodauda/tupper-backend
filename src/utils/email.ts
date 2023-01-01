import axios from 'axios';

export const sendVerificationEmail = (name: string, receiver: string, otp: string) => {
  const subject = 'Verification OTP';
  const body = `Your one-time code is: ${otp}`
  axios.post('https://api.sendchamp.com/api/v1/email/send', {
    from: { email: 'no-reply@tupper.com', name: 'Tupper App' },
    to: [{ email: receiver, name: name }],
    message_body: { type: "text/html", value: body },
    subject
  }, {
    headers: {
      Authorization: `Bearer ${process.env.SENDCHAMP_KEY}`,
      'Content-Type': 'application/json',
    }
  })
}