// src/app/api/watchlist/route.ts
import dbConnect from "@/lib/mongodb";
import Watchlist from "@/models/Watchlist";
import Fund from "@/models/Fund";
import { NextResponse } from "next/server";
import { differenceInCalendarDays, parseISO } from "date-fns";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const items = await Watchlist.find({ userId }).lean();
  const schemeCodes = items.map(i => i.schemeCode);
  const funds = await Fund.find({ schemeCode: { $in: schemeCodes } }).lean();

  // compute returns for durations relative to latestNavDate
  const durations = {
    "1D": 1,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365
  };

  const results = funds.map(f => {
    const history = (f.navHistory || []).map((d:any) => ({ date: d.date, nav: d.nav }));
    // assume history sorted desc (latest first); if not, sort
    // find NAV closest to latest minus duration
    const latest = history[0];
    const perf:any = {};
    for (const key of Object.keys(durations)) {
      const days = durations[key];
      // find past index where date difference >= days
      const targetDate = new Date(new Date(latest.date).getTime() - days*24*60*60*1000);
      const nearest = history.find((h:any) => new Date(h.date) <= targetDate) || history[history.length-1];
      if (!nearest) { perf[key] = null; continue; }
      perf[key] = ((latest.nav - nearest.nav) / nearest.nav) * 100;
    }
    return {
      schemeCode: f.schemeCode,
      schemeName: f.schemeName,
      latestNav: f.latestNav,
      latestNavDate: f.latestNavDate,
      performance: perf
    };
  });

  return NextResponse.json({ items: results });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { userId, schemeCode } = body;
  if (!userId || !schemeCode) return NextResponse.json({ error: "userId and schemeCode required" }, { status: 400 });

  await Watchlist.updateOne({ userId, schemeCode }, { $setOnInsert: { userId, schemeCode, createdAt: new Date() } }, { upsert: true });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  await dbConnect();
  const body = await req.json();
  const { userId, schemeCode } = body;
  if (!userId || !schemeCode) return NextResponse.json({ error: "userId and schemeCode required" }, { status: 400 });
  await Watchlist.deleteOne({ userId, schemeCode });
  return NextResponse.json({ ok: true });
}
