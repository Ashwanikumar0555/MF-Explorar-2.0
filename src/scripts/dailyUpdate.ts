import dotenv from "dotenv";
import fetch from "node-fetch";
import connectDB from "../lib/db/connect";
import Fund from "../lib/db/models/Fund";

dotenv.config({ path: ".env.local" });

const API_URL = "https://api.mfapi.in/mf"; // Example API base URL

async function updateDailyNAV() {
  try {
    await connectDB();

    const response = await fetch(`${API_URL}/100027`); // Replace with your MF scheme code
    const data = await response.json();

    const latest = data.data[0];
    const schemeName = data.meta.scheme_name;
    const schemeCode = data.meta.scheme_code;

    await Fund.findOneAndUpdate(
      { code: schemeCode },
      { name: schemeName, nav: latest.nav, date: latest.date },
      { upsert: true }
    );

    console.log(`✅ Updated ${schemeName} (${schemeCode}) NAV: ${latest.nav}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error updating NAV:", err);
    process.exit(1);
  }
}

updateDailyNAV();
