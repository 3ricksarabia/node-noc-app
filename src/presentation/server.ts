import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infraestructure/repositories/log.repository";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImp(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      "erick.sarabia@outlook.com",
    ]);
    emailService.sendEmailWithFileSystemLogs(["erick.sarabia@outlook.com"]);
  }
}
