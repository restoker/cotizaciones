import { initialData } from "./seed";

async function main() {
    console.log('Seed ejecutado');

    console.log(initialData);
}

(() => {
    main();
})()