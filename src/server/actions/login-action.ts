'use server'

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "@/types/safe-action";
import { db } from "..";
import bcrypt from 'bcryptjs'
import { signIn } from "../auth";


export const loginAction = actionClient
    .schema(loginSchema)
    .action(async ({ parsedInput: { email, password }, ctx: { } }) => {
        try {
            const user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email),
            });

            if (!user) return { ok: false, msg: 'Usuario o contraseña incorrectas' }

            const passwordCorrect = await bcrypt.compare(user.password, password);
            if (!passwordCorrect) return { ok: false, msg: 'Usuario o contraseña incorrectos' };
            // await signIn('credentials', {
            //     ...{ email, password },
            //     redirect: false,
            // });
            const { password: Elpassword, ...rest } = user;
            return { ok: true, msg: `Bienvenido nuevamente ${user.name}`, data: rest };
        } catch (e) {
            return { ok: false, msg: 'Error on server :D' }
        }
    })