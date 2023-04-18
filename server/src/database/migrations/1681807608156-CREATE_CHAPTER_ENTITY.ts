import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATECHAPTERENTITY1681807608156 implements MigrationInterface {
  name = 'CREATECHAPTERENTITY1681807608156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."chapters_status_enum" AS ENUM('draft', 'published')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chapters" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "numberOfChapter" integer NOT NULL, "status" "public"."chapters_status_enum" NOT NULL DEFAULT 'draft', "storyId" uuid NOT NULL, CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ADD "coverImg" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stories_status_enum" AS ENUM('completed', 'dropped', 'continuing')`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ADD "status" "public"."stories_status_enum" NOT NULL DEFAULT 'continuing'`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ADD "posterId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" DROP CONSTRAINT "FK_655cd324a6949f46e1b397f621e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" ADD CONSTRAINT "FK_2720e441e621b26246278c0ea4c" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ADD CONSTRAINT "FK_655cd324a6949f46e1b397f621e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stories" DROP CONSTRAINT "FK_655cd324a6949f46e1b397f621e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" DROP CONSTRAINT "FK_2720e441e621b26246278c0ea4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ALTER COLUMN "userId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stories" ADD CONSTRAINT "FK_655cd324a6949f46e1b397f621e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "stories" DROP COLUMN "posterId"`);
    await queryRunner.query(`ALTER TABLE "stories" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."stories_status_enum"`);
    await queryRunner.query(`ALTER TABLE "stories" DROP COLUMN "coverImg"`);
    await queryRunner.query(`DROP TABLE "chapters"`);
    await queryRunner.query(`DROP TYPE "public"."chapters_status_enum"`);
  }
}
