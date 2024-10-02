export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public crearedAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.crearedAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, crearedAt } = JSON.parse(json);

    const log = new LogEntity(message, level);
    log.crearedAt = new Date(crearedAt);

    return log;
  };
}
