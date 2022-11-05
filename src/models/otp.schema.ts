import { Schema, model } from "mongoose";

const OTPSchema = new Schema({
  uuidUser: {
    type: String,
    require: true,
    unique: true,
  },
  otp: {
    type: Number,
    require: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
    index: true,
  },
});

const OTPModel = model("OTP", OTPSchema);

export default OTPModel;
