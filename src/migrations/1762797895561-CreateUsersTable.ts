import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1762797895561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE users (
                id uuid PRIMARY KEY,
                email varchar UNIQUE NOT NULL,
                password_hash text,
                is_verified boolean NOT NULL DEFAULT false,
                is_active boolean NOT NULL DEFAULT true,
                role varchar DEFAULT 'client',
                created_at timestamptz NOT NULL DEFAULT (now()),
                updated_at timestamptz NOT NULL DEFAULT (now()),
                CHECK (role in ('client', 'employee', 'admin'))
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DROP TABLE users";
            `
        )
    }

}
