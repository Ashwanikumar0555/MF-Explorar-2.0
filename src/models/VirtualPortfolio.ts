// src/models/VirtualPortfolio.ts
import mongoose, { Schema } from "mongoose";

const SIPSchema = new Schema({
  name: String,
  schemeCode: { type: Number, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ["monthly","quarterly"], default: "monthly" },
  startDate: String, // YYYY-MM-DD
  endDate: String, // optional
  createdAt: { type: Date, default: () => new Date() }
}, { _id: false });

const VirtualPortfolioSchema = new Schema({
  userId: { type: String, required: true, index: true },
  name: String,
  sips: { type: [SIPSchema], default: [] },
  createdAt: { type: Date, default: () => new Date() }
}, { timestamps: true });

export default mongoose.models.VirtualPortfolio || mongoose.model("VirtualPortfolio", VirtualPortfolioSchema);
