import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

const customErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error.",
  });
};

export default customErrorHandler;
