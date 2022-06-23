import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Customer, Transaction } from "./";

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "card_number", unique: true })
  cardNumber: string;

  @Column({ name: "card_owner" })
  cardOwner: string;

  @Column({ name: "card_validity" })
  cardValidity: string;

  @Column({ name: "cvv" })
  cvv: string;

  @ManyToOne(() => Customer, (customer) => customer.wallets)
  customer: Customer;

  @OneToMany(() => Transaction, (transactions) => transactions.wallet)
  transactions: Transaction[];
}
