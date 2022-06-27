import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Customer, Address } from "../entities";
import { serializedRegisterCustomer, serializedGetCustomer } from "../schemas";
import bcrypt from "bcrypt";

// C [done]
// R [done]
// U 
// D

class CustomerService {
  private customerRepository = AppDataSource.getRepository(Customer);
  private addressRepository = AppDataSource.getRepository(Address);

  public registerCustomer = async ({ body }: Request) => {
    const { address, ...data } = body;

    const hashedPassword = await bcrypt.hash(body.password, 10);
    data.password = hashedPassword;

    let customerData = new Customer();
    customerData = { ...data };

    let customerAddress = new Address();
    customerAddress = { ...address };
    customerAddress.customer = customerData;

    await this.customerRepository.save(customerData);
    await this.addressRepository.save(customerAddress);

    const customer = await this.customerRepository.findOneBy({
      id: customerData.id,
    });

    return await serializedRegisterCustomer.validate(customer, {
      stripUnknown: true,
    });
  };

  public getCustomer = async ({ params }: Request) => {
    const { id } = params;

    const customer = await this.customerRepository.findOneBy({ id: id });

    return await serializedGetCustomer.validate(customer, {
      stripUnknown: true,
    });
  };
}

export default new CustomerService();
