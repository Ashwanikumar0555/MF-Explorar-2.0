import mongoose from "mongoose";

const FundSchema = new mongoose.Schema({
  name: String,
  code: String,
  nav: Number,
  date: String,
});

const Fund = mongoose.models.Fund || mongoose.model("Fund", FundSchema);
export default Fund;
