import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validateSchema =
  (shape: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
