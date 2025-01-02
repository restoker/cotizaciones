ALTER TABLE "user" ALTER COLUMN "roles" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."user" ALTER COLUMN "roles" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "public"."user" ALTER COLUMN "roles" SET DATA TYPE "public"."roles" USING "roles"::"public"."roles";