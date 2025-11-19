import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeesTable1763551590418 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE "employees" (
                "id" UUID PRIMARY KEY,
                "name" varchar NOT NULL,
                "registration_code" varchar NOT NULL,
                "photo_url" varchar NOT NULL,
                "user_id" uuid NOT NULL,
                "created_by" uuid NOT NULL,
                "created_at" timestamptz NOT NULL DEFAULT (now()),
                "update_at" timestamptz NOT NULL DEFAULT (now())
            );

                ALTER TABLE "employees" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

                ALTER TABLE "employees" ADD FOREIGN KEY ("created_by") REFERENCES "employees" ("id");
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE "employees";
        `);
    }

}
