CREATE TYPE "public"."estado" AS ENUM('open', 'closed');--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "estado" "estado" DEFAULT 'open';