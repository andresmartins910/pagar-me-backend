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

  public updateCustomer = async (req: Request, res: Response) => {
    const updatedCustomer = await customerService.updateCustomer(req);

    return res.status(200).json(updatedCustomer);
  };

  public deleteCustomer = async (req: Request, res: Response) => {
    const { statusCode, successMessage } = await customerService.deleteCustomer(
      req
    );

    return res.status(statusCode).json({
      message: successMessage,
    });
  };
}

export default new CustomerController();
