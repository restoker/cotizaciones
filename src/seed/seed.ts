import bcrypt from 'bcryptjs';

enum Role {
    user = 'user',
    admin = 'admin'
}

interface SeedUser {
    email: string,
    password: string,
    name: string,
    role: Role,
    image?: string,
}

interface SeedData {
    usuarios: SeedUser[],
}

export const initialData: SeedData = {
    usuarios: [
        {
            email: 'milthon@gmail.com',
            password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10)),
            name: 'doom',
            role: Role.admin,
            image: 'https://avatars.githubusercontent.com/u/32400065?v=4&size=64'
        },
        {
            email: 'peker@gmail.com',
            password: bcrypt.hashSync('12345', bcrypt.genSaltSync(10)),
            name: 'peker diaz',
            role: Role.user
        },
    ],
}