import { Router } from "express";
import customerController from "../controllers/customer.controller";

export const customer = Router();

customer.route("/").post(customerController.registerCustomer);

customer
  .route("/:id")
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer)
  .get(customerController.getCustomer);
