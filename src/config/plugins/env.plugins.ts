import "dotenv/config";
import * as env from "env-var";

export const envs = {
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
};
