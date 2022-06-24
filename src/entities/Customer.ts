import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Address, Wallet } from "./";

export enum DocumentType {
  CPF = "cpf",
  RG = "rg",
}

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  document: string;

  @Column({ type: "enum", enum: DocumentType })
  type: DocumentType;

  @Column("simple-array")
  phones: string[];

  @Column()
  birthday: string;

  @Column("decimal")
  funds: number;

  @OneToOne(() => Address, (address) => address.customer, {
    eager: true,
    nullable: false,
  })
  address: Address;

  @OneToMany(() => Wallet, (wallets) => wallets.customer, { eager: true })
  wallets: Wallet[];
}
