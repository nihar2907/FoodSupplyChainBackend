import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

const getConfig = (): NodeJS.ProcessEnv => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    ORIGIN: process.env.ORIGIN,
    FAST2SMS: process.env.FAST2SMS,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible.

const getSanitzedConfig = (config: NodeJS.ProcessEnv): NodeJS.ProcessEnv => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

// export const PORT = process.env.PORT;
// export const MONGODB_URI = process.env.MONGODB_URI;
// export const NODE_ENV = process.env.NODE_ENV;
// export const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
// export const ORIGIN = process.env.ORIGIN;
// export const FAST2SMS = process.env.FAST2SMS
