import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    primaryKey,
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
    email: text("email").notNull(),
    image: text("image"),
    password: text('password'),
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
