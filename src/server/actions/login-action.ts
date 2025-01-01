'use server'

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "@/types/safe-action";
import { db } from "..";
import { signIn } from "../auth";


export const loginAction = actionClient
    .schema(loginSchema)
    .action(async ({ parsedInput: { email, password }, ctx: { } }) => {
        try {
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });

            if (!user) return { ok: false, msg: 'User not found' }

            await signIn('credentials', {
                ...{ email, password },
                redirect: false,
            });
            return { ok: true, msg: 'Wellcome back', data: user?.email };
        } catch (e) {
            return { ok: false, msg: 'Error on server :D' }
        }
    })