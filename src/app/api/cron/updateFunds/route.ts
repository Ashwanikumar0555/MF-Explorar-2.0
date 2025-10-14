// src/app/api/cron/updateFunds/route.ts
import dbConnect from "@/lib/mongodb";
import Fund from "@/models/Fund";
import axios from "axios";

export async function GET(req: Request) {
  await dbConnect();

  try {
    // 1) Fetch list of all schemes
    const listRes = await axios.get("https://api.mfapi.in/mf");
    const schemes: any[] = listRes.data; // array of {schemeCode, schemeName, ...}

    // For each scheme we fetch metadata+latest NAV quickly
    // To be efficient, we can fetch only those we need or fetch details in batches.
    // Simple implementation: iterate with a small limit or parallel with throttling
    const BATCH = 50;
    for (let i = 0; i < schemes.length; i += BATCH) {
      const batch = schemes.slice(i, i + BATCH);
      // fetch details in parallel (but be careful with rate limits)
      const promises = batch.map(s => axios.get(`https://api.mfapi.in/mf/${s.schemeCode}`).catch(e => null));
      const results = await Promise.all(promises);
      const ops = [];
      for (let j = 0; j < batch.length; j++) {
        const res = results[j];
        if (!res || !res.data) continue;
        const payload = res.data;
        const meta = payload.meta || {};
        const navHistory = payload.data || [];
        if (!navHistory.length) continue;
        const latest = navHistory[0];
        // Only keep funds that have a latest NAV (active)
        const active = !!(latest && latest.nav);
        const navList = navHistory.slice(0, 365*5).map((d:any) => ({ date: d.date, nav: parseFloat(d.nav) })); // keep upto 5 years
        ops.push({
          updateOne: {
            filter: { schemeCode: meta.scheme_code || Number(batch[j].schemeCode) },
            update: {
              $set: {
                schemeName: meta.scheme_name || batch[j].schemeName,
                fundHouse: meta.fund_house,
                schemeType: meta.scheme_type,
                schemeCategory: meta.scheme_category,
                isinDivPayout: meta.isin_dividend_payout,
                isinDivReinvestment: meta.isin_dividend_reinvestment,
                latestNavDate: latest.date,
                latestNav: parseFloat(latest.nav),
                active,
                navHistory: navList,
              }
            },
            upsert: true
          }
        });
      }
      if (ops.length) {
        await Fund.bulkWrite(ops);
      }
      // small delay to avoid hammering MFAPI
      await new Promise(res => setTimeout(res, 300));
    }

    // Optionally: mark funds that didn't appear today as inactive
    // await Fund.updateMany({ latestNavDate: { $ne: todayISO } }, { $set: { active: false } });

    return new Response(JSON.stringify({ ok: true, message: "Funds updated" }), { status: 200 });
  } catch (err: any) {
    console.error("Update error:", err.message || err);
    return new Response(JSON.stringify({ ok: false, error: err.message || String(err) }), { status: 500 });
  }
}
