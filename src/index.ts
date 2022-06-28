import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import routes from "./routes";
import { customErrorHandler } from "./middlewares";

export const app = express();

app.use(express.json());

// helmet adds an extra layer of security
app.use(helmet());

// log middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// routes
routes(app);

// error handler
app.use(customErrorHandler);
