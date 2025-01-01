import bcrypt from 'bcryptjs';

enum Role {
    user = 'user',
    admin = 'admin'
}

interface SeedUser {
    email: string,
    password: string,
    name: string,
    rol: Role[]
}

interface SeedData {
    users: SeedUser[],
}

export const initialData: SeedData = {
    users: [
        {
            email: 'milthon@gmail.com',
            password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10)),
            name: 'milthon ttito',
            rol: [Role.admin, Role.user]
        },
        {
            email: 'peker@gmail.com',
            password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10)),
            name: 'peker diaz',
            rol: [Role.user]
        },
    ],
}