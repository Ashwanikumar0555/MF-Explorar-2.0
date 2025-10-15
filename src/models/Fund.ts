// src/models/Fund.ts
import mongoose, { Schema } from "mongoose";

const NAVSchema = new Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  nav: { type: Number, required: true },
}, { _id: false });

const FundSchema = new Schema({
  schemeCode: { type: Number, required: true, unique: true, index: true },
  schemeName: { type: String, required: true },
  fundHouse: String,
  schemeType: String,
  schemeCategory: String,
  isinDivPayout: String,
  isinDivReinvestment: String,
  // latest nav (object) for quick filtering
  latestNavDate: String,
  latestNav: Number,
  active: { type: Boolean, default: true, index: true },
  navHistory: { type: [NAVSchema], default: [] }, // optional: truncate older points to save space
}, { timestamps: true });

export default mongoose.models.Fund || mongoose.model("Fund", FundSchema);
