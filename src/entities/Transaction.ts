import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./";

export enum PaymentMethod {
  DEBIT = "debit",
  CREDIT = "credit",
}

export enum Payables {
  PAID = "paid",
  WAITING = "waiting_funds",
}

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  total: number;

  @Column()
  description: string;

  @Column({ type: "enum", enum: PaymentMethod, name: "payment_method" })
  paymentMethod: PaymentMethod;

  @Column({ type: "enum", enum: Payables })
  payables: Payables;

  @Column({ name: "payment_date" })
  paymentDate: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet: Wallet;
}
