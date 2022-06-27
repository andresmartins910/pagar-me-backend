import { MigrationInterface, QueryRunner } from "typeorm";

export class removedDocumentType1656357209651 implements MigrationInterface {
    name = 'removedDocumentType1656357209651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."customers_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customers_type_enum" AS ENUM('cpf', 'rg')`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "type" "public"."customers_type_enum" NOT NULL`);
    }

}
