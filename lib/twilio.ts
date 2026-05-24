import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
const adminWhatsappNumber = process.env.ADMIN_WHATSAPP_NUMBER;

if (!accountSid || !authToken || !whatsappFrom || !adminWhatsappNumber) {
  throw new Error('Missing Twilio environment variables.');
}

export const twilioClient = new Twilio(accountSid, authToken);
export const whatsappFromNumber = whatsappFrom;
export const adminWhatsappNumberValue = adminWhatsappNumber;
