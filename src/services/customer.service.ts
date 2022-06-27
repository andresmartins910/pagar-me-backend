import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Customer, Address } from "../entities";
import { serializedRegisterCustomer, serializedGetCustomer } from "../schemas";
import bcrypt from "bcrypt";

// C [done]
// R [done]
// U [almost done]
// D [done]

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

  public updateCustomer = async ({ body, params }: Request) => {
    // TODO: fix schema

    const { id } = params;

    const { name, email, password, document, phones, birthday, address } = body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      body.password = hashedPassword;
    }

    const customer = await this.customerRepository.findOneBy({ id: id });

    if (address) {
      await this.addressRepository.update(customer.address.id, { ...address });
      delete body.address;
    }

    if (name || email || password || document || phones || birthday) {
      await this.customerRepository.update(customer.id, {
        ...body,
      });
    }

    const updatedCustomer = await this.customerRepository.findOneBy({ id: id });

    return updatedCustomer;
  };

  public deleteCustomer = async ({ params }: Request) => {
    const { id } = params;

    const customer = await this.customerRepository.findOneBy({ id: id });

    await this.addressRepository.delete({ id: customer.address.id });
    await this.customerRepository.delete({ id: customer.id });

    return {
      statusCode: 200,
      successMessage: "Customer deleted successfully!",
    };
  };
}

export default new CustomerService();
