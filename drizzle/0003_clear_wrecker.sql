ALTER TABLE "user" ALTER COLUMN "roles" SET DATA TYPE roles[];--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{}';