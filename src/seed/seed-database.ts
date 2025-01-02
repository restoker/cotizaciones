import { initialData } from "./seed";
import { db } from '../server'
import { users } from "../server/schema";

const main = async () => {
    console.log('Seed ejecutado');
    const promise1 = await db.delete(users);
    // delete all registers
    await Promise.all([promise1,]);

    const { usuarios } = initialData;

    usuarios.map(async (user) => {
        await db.insert(users).values(user);
    })
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})()