import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities";
import { CustomError } from "../errors/customError";

export const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const customerRepository = AppDataSource.getRepository(Customer);

    const customer = await customerRepository.findOneBy({ id: id });

    if (!customer) throw new CustomError(404, "Customer not found.");

    next();
  } catch (error) {
    throw new CustomError(400, error.message);
  }
};
