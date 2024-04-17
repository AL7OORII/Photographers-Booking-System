const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = (to, message) => {
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: "+440" + to,
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

module.exports = { sendSMS };
