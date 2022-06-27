import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities";
import { CustomError } from "../errors/customError";

export const verifyEmailAndDocument = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email, document } = req.body;

  const customerRepository = AppDataSource.getRepository(Customer);

  if (email) {
    const emailIsAlreadyRegistered = await customerRepository.findOneBy({
      email: email,
    });

    if (emailIsAlreadyRegistered)
      throw new CustomError(409, "Email already registered.");
  }

  if (document) {
    const documentIsAlreadyRegistered = await customerRepository.findOneBy({
      document: document,
    });

    if (documentIsAlreadyRegistered)
      throw new CustomError(409, "Document already registered.");
  }

  next();
};
