import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Customer, Address } from "../entities";

class CustomerService {
  private customerRepository = AppDataSource.getRepository(Customer);
  private addressRepository = AppDataSource.getRepository(Address);

  public registerCustomer = async ({ body }: Request) => {

    const { address, ...data } = body;


    // const newCustomer = await this.customerRepository.save(customerData);

    // return newCustomer;

    return "";
  };
}

export default new CustomerService();
