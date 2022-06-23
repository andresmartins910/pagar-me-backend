import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "address_1" })
  address1: string;

  @Column({ name: "address_2" })
  address2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @OneToOne(() => Customer, (customer) => customer.address)
  @JoinColumn()
  customer: Customer;
}
