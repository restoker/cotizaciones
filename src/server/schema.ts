import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    real,
    text,
    timestamp
} from "drizzle-orm/pg-core";
// import type { AdapterAccountType } from 'next-auth/adapters';

export const RoleEnum = pgEnum("roles", ["user", "admin"]);
export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    image: text("image"),
    password: text('password').notNull(),
    role: RoleEnum("roles").default('user'),
})

export const passwordResetTokens = pgTable("passwordResetToken",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
        email: text('email').notNull(),
    },
    // (table) => {
    //     return [{
    //         compositePk: primaryKey({
    //             columns: [table.id, table.token],
    //         }),
    //     }]
    // }
)

export const products = pgTable('products', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    description: text('description').notNull(),
    color: text('color').notNull(),
    title: text('title').notNull(),
    // created: timestamp('created').defaultNow(),
    price: real('price').notNull(),
    updated: timestamp('updated').defaultNow(),
});


export const productImages = pgTable('productImages', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    url: text('url').notNull(),
    size: real('size').notNull(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    productId: text("productId").notNull()
        .references(() => products.id, { onDelete: 'cascade' })
});


export const productVariant = pgTable('productVariant', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    color: text('color').notNull(),
    productType: text('productType').notNull(),
    productId: text("productId").notNull().references(() => products.id, { onDelete: 'cascade' }),
    updated: timestamp('updated').defaultNow(),
});

export const variantImages = pgTable('variantImages', {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    url: text('url').notNull(),
    size: real('size').notNull(),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    order: real('order').notNull(),
    variantId: text("variantId").notNull()
        .references(() => productVariant.id, { onDelete: 'cascade' })
});
