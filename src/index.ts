import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import customErrorHandler from "./middlewares/customErrorHandler.middleware";

export const app = express();

app.use(express.json());

// log middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// routes \/

// error middleware
app.use(customErrorHandler);
