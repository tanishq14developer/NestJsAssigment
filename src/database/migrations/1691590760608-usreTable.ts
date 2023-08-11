import { MigrationInterface, QueryRunner } from "typeorm";

export class usreTable1691590760608 implements MigrationInterface {
    name = 'usreTable1691590760608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "full_name" character varying(255), "email" character varying(255), "password" character varying(255), "role" "public"."Users_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Videos" ("publish_time" character varying(255), "channel_name" character varying(255), "video_id" character varying(255) NOT NULL, "video_name" character varying(255), "video_url" character varying(255), "video_description" character varying(255), "video_thumbnail" character varying(255), CONSTRAINT "PK_d7319953553fd114c96168c6198" PRIMARY KEY ("video_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Videos"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
    }

}
