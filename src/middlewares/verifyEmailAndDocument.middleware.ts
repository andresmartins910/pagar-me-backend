import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities";
import { CustomError } from "../errors/customError";

export const verifyEmailAndDocument = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { body } = req;

  const customerRepository = AppDataSource.getRepository(Customer);

  const emailIsAlreadyRegistered = await customerRepository.findOneBy({
    email: body.email,
  });

  if (emailIsAlreadyRegistered)
    throw new CustomError(409, "Email already registered.");

  const documentIsAlreadyRegistered = await customerRepository.findOneBy({
    document: body.document,
  });

  if (documentIsAlreadyRegistered)
    throw new CustomError(409, "Document already registered.");

  next();
};
