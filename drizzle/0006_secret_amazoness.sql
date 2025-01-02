ALTER TABLE "user" ALTER COLUMN "roles" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."user" ALTER COLUMN "roles" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "public"."user" ALTER COLUMN "roles" SET DATA TYPE "public"."roles" USING "roles"::"public"."roles";