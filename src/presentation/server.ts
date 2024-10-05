import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infraestructure/repositories/log.repository";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";

const fsLogRepository = new LogRepositoryImp(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImp(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImp(new PostresLogDatasource());
const emailService = new EmailService();

export class Server {
  public static async start() {
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "erick.sarabia@outlook.com",
    // ]);
    // emailService.sendEmailWithFileSystemLogs(["erick.sarabia@outlook.com"]);
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
