import { MigrationInterface, QueryRunner } from "typeorm";

export class WatchLaterMigration1691667252307 implements MigrationInterface {
    name = 'WatchLaterMigration1691667252307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "WatchLater" ("watch_later_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "videoId" character varying(255), CONSTRAINT "PK_21c8233c6612e9423b98011985d" PRIMARY KEY ("watch_later_id"))`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Videos" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_df5fa3bb8751cd44d3746e39922" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_bfe35768809b86562a07dc015f5" FOREIGN KEY ("videoId") REFERENCES "Videos"("video_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_bfe35768809b86562a07dc015f5"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_df5fa3bb8751cd44d3746e39922"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "Videos" DROP COLUMN "created_at"`);
        await queryRunner.query(`DROP TABLE "WatchLater"`);
    }

}
