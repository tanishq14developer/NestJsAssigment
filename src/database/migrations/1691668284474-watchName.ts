import { MigrationInterface, QueryRunner } from "typeorm";

export class WatchName1691668284474 implements MigrationInterface {
    name = 'WatchName1691668284474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_df5fa3bb8751cd44d3746e39922"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_bfe35768809b86562a07dc015f5"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "videoId"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "user" uuid`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "video" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_b7e3965bc97f7d39747dbbc6e21" FOREIGN KEY ("user") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_c0ab770855f2cfcc29ad210d21e" FOREIGN KEY ("video") REFERENCES "Videos"("video_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_c0ab770855f2cfcc29ad210d21e"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP CONSTRAINT "FK_b7e3965bc97f7d39747dbbc6e21"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "videoId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_bfe35768809b86562a07dc015f5" FOREIGN KEY ("videoId") REFERENCES "Videos"("video_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WatchLater" ADD CONSTRAINT "FK_df5fa3bb8751cd44d3746e39922" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
