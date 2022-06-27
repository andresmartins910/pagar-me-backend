import { Router } from "express";
import { validateSchema } from "../middlewares";

// controllers
import customerController from "../controllers/customer.controller";

// middlewares
import { verifyEmailAndDocument, verifyIdExists } from "../middlewares";

// schemas
import { registerCustomer } from "../schemas";

export const customer = Router();

customer
  .route("/")
  .post(
    validateSchema(registerCustomer),
    verifyEmailAndDocument,
    customerController.registerCustomer
  );

customer
  .route("/:id")
  .get(verifyIdExists, customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);
