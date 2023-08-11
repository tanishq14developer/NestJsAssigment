import { MigrationInterface, QueryRunner } from "typeorm";

export class WatchNames1691668399139 implements MigrationInterface {
    name = 'WatchNames1691668399139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "PK_21c8233c6612e9423b98011985d"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "PK_608c119f6b08a202557e3105c7f" PRIMARY KEY ("watch_later_id", "id")`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "PK_608c119f6b08a202557e3105c7f"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "PK_21c8233c6612e9423b98011985d" PRIMARY KEY ("watch_later_id")`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "id"`);
    }

}
