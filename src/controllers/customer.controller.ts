import { Request, Response } from "express";
import customerService from "../services/customer.service";

class CustomerController {
  public registerCustomer = async (req: Request, res: Response) => {
    const newCustomer = await customerService.registerCustomer(req);

    return res.status(200).json(newCustomer);
  };

  public updateCustomer = async () => {};

  public deleteCustomer = async () => {};

  public getCustomer = async () => {};
}

export default new CustomerController();
