import NextAuth from 'next-auth';
import { db } from '.';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/types/login-schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/'
    },
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const parsedCredentials = loginSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    return null
                }
                const { email, password } = parsedCredentials.data;
                console.log(email);
                console.log(password);
                // const user = await getUser(email);
                // if (!user) return null;
                return null;
            },
        }),
    ],
})