const fast2sms = require("fast-two-sms");
import { NextFunction } from "express";
import sanitizedConfig from "../config";

const { FAST2SMS } = sanitizedConfig;

export const generateOTP = (otp_length: number) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const fast2SMS = async (
  { message, contactNumber }: { message: string; contactNumber: number },
  next: NextFunction
) => {
  try {
    const res = await fast2sms.sendMessage({
      authorization: FAST2SMS,
      message,
      numbers: [contactNumber],
    });
    console.log(res);
  } catch (error) {
    next(error);
  }
};
