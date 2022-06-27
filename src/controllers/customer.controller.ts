import { Request, Response } from "express";
import customerService from "../services/customer.service";

class CustomerController {
  public registerCustomer = async (req: Request, res: Response) => {
    const newCustomer = await customerService.registerCustomer(req);

    return res.status(200).json(newCustomer);
  };

  public getCustomer = async (req: Request, res: Response) => {
    const customer = await customerService.getCustomer(req);

    return res.status(200).json(customer);
  };

  public updateCustomer = async () => {};

  public deleteCustomer = async () => {};
}

export default new CustomerController();
