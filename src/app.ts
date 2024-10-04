import "dotenv/config";
import { Server } from "./presentation/server";

console.log("hello world!!!");

const main = () => {
  Server.start();
  // console.log({ mailer: process.env.MAILER_EMAIL });
};

(async () => {
  main();
})();
