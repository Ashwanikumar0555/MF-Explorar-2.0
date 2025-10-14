// src/app/api/funds/route.ts
import dbConnect from "@/lib/mongodb";
import Fund from "@/models/Fund";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = parseInt(url.searchParams.get("perPage") || "20");

  const filter: any = { active: true };
  if (q) {
    // text search on schemeName
    filter.schemeName = { $regex: q, $options: "i" };
  }

  const total = await Fund.countDocuments(filter);
  const funds = await Fund.find(filter)
    .sort({ schemeName: 1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  return NextResponse.json({ funds, total, page, perPage });
}
