import { Server } from "./presentation/server";

console.log("hello world!!!");

const main = () => {
    Server.start();
}

(async () => {
    main();
})();

