import cron from "node-cron";
import { exec } from "child_process";

// Schedule the cron job to run every day at 9:00 AM IST
cron.schedule("0 9 * * *", () => {
  console.log("🕘 Running daily NAV update...");
  
  exec("npx ts-node src/scripts/dailyUpdate.ts", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }
    console.log(stdout);
  });
});

console.log("✅ Cron scheduler started and waiting for 9:00 AM job...");
