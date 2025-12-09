import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "logs", "cron.log");

export const log = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  fs.appendFileSync(logFile, logMessage, { encoding: "utf8" });
  console.log(logMessage); // optional: also show in console
};
