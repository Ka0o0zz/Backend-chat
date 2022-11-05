import twilio from "twilio";

const accountSid = "ACfc0815ed456c1a1c4307b9a91094eb1e";
const authToken = "757a0dbe8f3e80f4e420cb1178c66afb";

const client = new (twilio as any)(accountSid, authToken);

const createSMS = (otp: number) => {
  client.messages.create({
    body: `Your RealTimeChat verification code is: ${otp}`,
    to: "+573102248070",
    from: "+18316042396",
  });
};

export const sendSMS = (otp: number) => createSMS(otp);
