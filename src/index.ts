import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { API_ENDPOINT_NOT_FOUND, SERVER_ERR } from "./errors";
import { authRoutes } from "./routes/Auth";
import morgan from "morgan";
import bodyParser from "body-parser";
import sanitizedConfig from "./config";

// Init express
const app = express();

// add body parser for ts support
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// .env variables

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = sanitizedConfig;

// middlewares (if any)

// index route

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "Connection to server established",
    data: null,
  });
});

// routes middlewares

app.use("/api/auth", authRoutes);
// app.use("/api/product", productRoutes);

// page not found error handling  middleware

app.use("*", (req, res, next) => {
  console.log('inside * method');
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND,
  };
  next(error);
});

// global error handling middleware

app.use((req, res, next) => {
  // console.log(err);
  // const status = err.status || 500;
  // const message = err.message || SERVER_ERR;
  // const data = err.data || null;
  res.json({
    type: "error",
    // message,
    // data,
  });
});

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// log in development environment

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// index to boot
const index = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connection to database established successfully.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

index();
