import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import sanitizedConfig from "../config";

const { JWT_SECRET } = sanitizedConfig;

export const createJwtToken = (payload: object) => {
  // TODO add type
  console.log(payload);
  const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: "2d" });
  return token;
};

export const verifyJwtToken = (token: string, next: NextFunction) => {
  try {
    const userId = jwt.verify(token, JWT_SECRET as string);
    return userId;
  } catch (err) {
    next(err);
  }
};
