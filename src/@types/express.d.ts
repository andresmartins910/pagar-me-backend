import { Customer } from "../entities";

declare global {
  namespace Express {
    interface Request {
      // validated: Customer;
    }
  }
}
