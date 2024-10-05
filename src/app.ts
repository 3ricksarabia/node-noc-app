import "dotenv/config";
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data/mongo/init";
import { envs } from "./config/plugins/env.plugins";
import { LogModel } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

const main = async () => {
  Server.start();
  // console.log({ mailer: process.env.MAILER_EMAIL });
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message",
  //     origin: "App.ts",
  //   },
  // });

  //console.log(newLog);

  const logs = await prisma.logModel.findMany({
    where: {
      level: "HIGH",
    },
  });

  console.log(logs);
};

(async () => {
  main();
})();
