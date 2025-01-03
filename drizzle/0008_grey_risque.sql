CREATE TABLE "productImages" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"productId" text NOT NULL,
	CONSTRAINT "productImages_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "productVariant" (
	"id" text PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"productType" text NOT NULL,
	"productId" text NOT NULL,
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"color" text NOT NULL,
	"title" text NOT NULL,
	"price" real NOT NULL,
	"updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "variantImages" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" real NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"order" real NOT NULL,
	"variantId" text NOT NULL,
	CONSTRAINT "variantImages_key_unique" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "productImages" ADD CONSTRAINT "productImages_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantImages" ADD CONSTRAINT "variantImages_variantId_productVariant_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariant"("id") ON DELETE cascade ON UPDATE no action;