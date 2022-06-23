import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1656005043139 implements MigrationInterface {
    name = 'createEntities1656005043139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address_1" character varying NOT NULL, "address_2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, "country" character varying NOT NULL, "customerId" uuid, CONSTRAINT "REL_b5976584943ec93aa5394a5532" UNIQUE ("customerId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card_number" character varying NOT NULL, "card_owner" character varying NOT NULL, "card_validity" character varying NOT NULL, "cvv" character varying NOT NULL, "customerId" uuid, CONSTRAINT "UQ_04cac2db29e16430b8450f83999" UNIQUE ("card_number"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_payment_method_enum" AS ENUM('debit', 'credit')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_payables_enum" AS ENUM('paid', 'waiting_funds')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" integer NOT NULL, "description" character varying NOT NULL, "payment_method" "public"."transactions_payment_method_enum" NOT NULL, "payables" "public"."transactions_payables_enum" NOT NULL, "payment_date" character varying NOT NULL, "walletId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."customers_type_enum" AS ENUM('cpf', 'rg')`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "document" character varying NOT NULL, "type" "public"."customers_type_enum" NOT NULL, "phones" text NOT NULL, "birthday" character varying NOT NULL, "funds" numeric NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_68c9c024a07c49ad6a2072d23c6" UNIQUE ("document"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_b5976584943ec93aa5394a55320" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_014befecbbc1dc6f0c649e33572" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_a88f466d39796d3081cf96e1b66" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_a88f466d39796d3081cf96e1b66"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_014befecbbc1dc6f0c649e33572"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_b5976584943ec93aa5394a55320"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TYPE "public"."customers_type_enum"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_payables_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_payment_method_enum"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
