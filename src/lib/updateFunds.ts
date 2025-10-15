// src/lib/updateFunds.ts
import axios from "axios";
import pLimit from "p-limit";
import dbConnect from "./mongodb";
import Fund from "@/models/Fund";

const BATCH_SIZE = parseInt(process.env.UPDATE_BATCH_SIZE || "50", 10);
const CONCURRENCY = parseInt(process.env.CONCURRENCY_LIMIT || "5", 10);
const MFAPI_BASE = "https://api.mfapi.in";

type MFMeta = {
  scheme_code?: number | string;
  scheme_name?: string;
  fund_house?: string;
  scheme_type?: string;
  scheme_category?: string;
  isin_dividend_payout?: string;
  isin_dividend_reinvestment?: string;
};

export async function updateFunds({ limitAll = false } = {}) {
  await dbConnect();

  // 1) Fetch master list
  const listRes = await axios.get(`${MFAPI_BASE}/mf`);
  const schemes: any[] = listRes.data || [];

  // optional limit for local dev
  const targetSchemes = limitAll ? schemes : schemes.slice(0, schemes.length);

  // chunking
  for (let i = 0; i < targetSchemes.length; i += BATCH_SIZE) {
    const batch = targetSchemes.slice(i, i + BATCH_SIZE);
    const limit = pLimit(CONCURRENCY);

    // fetch each scheme details in parallel with concurrency limit
    const promises = batch.map((s) =>
      limit(async () => {
        try {
          const res = await axios.get(`${MFAPI_BASE}/mf/${s.schemeCode}`, { timeout: 20000 });
          return res.data;
        } catch (err) {
          console.warn(`Failed fetch scheme ${s.schemeCode}`, err?.message || err);
          return null;
        }
      })
    );

    const results = await Promise.all(promises);

    const bulkOps: any[] = [];
    for (let j = 0; j < batch.length; j++) {
      const payload = results[j];
      if (!payload || !payload.meta || !payload.data || payload.data.length === 0) continue;

      const meta = payload.meta as MFMeta;
      const navHistoryRaw = payload.data as any[];
      // Store up to 5 years of NAV or all if smaller
      const navKeep = navHistoryRaw.slice(0, 365 * 5).map((d) => ({
        date: d.date,
        nav: parseFloat(d.nav)
      }));

      const latest = navKeep[0];
      if (!latest || !latest.nav) continue; // no valid NAV -> skip

      const schemeCode = Number(meta.scheme_code || batch[j].schemeCode);

      bulkOps.push({
        updateOne: {
          filter: { schemeCode },
          update: {
            $set: {
              schemeCode,
              schemeName: meta.scheme_name || batch[j].schemeName,
              fundHouse: meta.fund_house,
              schemeType: meta.scheme_type,
              schemeCategory: meta.scheme_category,
              isinDivPayout: meta.isin_dividend_payout,
              isinDivReinvestment: meta.isin_dividend_reinvestment,
              latestNavDate: latest.date,
              latestNav: latest.nav,
              active: true,
              navHistory: navKeep
            }
          },
          upsert: true
        }
      });
    }

    if (bulkOps.length) {
      // perform bulkWrite
      try {
        await Fund.bulkWrite(bulkOps, { ordered: false });
        console.log(`Batch ${i}-${i + BATCH_SIZE} written (${bulkOps.length} ops)`);
      } catch (err) {
        console.error("bulkWrite error:", err);
      }
    }

    // polite delay between batches
    await new Promise((r) => setTimeout(r, 300));
  }

  // Optional: set inactive funds whose latestNavDate is not today
  // const todayISO = new Date().toISOString().slice(0, 10);
  // await Fund.updateMany({ latestNavDate: { $ne: todayISO } }, { $set: { active: false } });

  return { ok: true, processed: targetSchemes.length };
}
