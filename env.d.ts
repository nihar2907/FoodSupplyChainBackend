import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      ORIGIN?: string;
      FAST2SMS: string;
    }
  }
}

export {};
