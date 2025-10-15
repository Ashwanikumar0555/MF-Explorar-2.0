import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define an interface for TypeScript
export interface IWatchlist extends Document {
  userId: string;        // The user who owns this watchlist
  schemeCode: string;    // Mutual fund code
  schemeName: string;    // Name of the fund
  fundHouse: string;     // Fund house
  addedAt: Date;         // When it was added
}

// 2. Define the schema
const WatchlistSchema: Schema<IWatchlist> = new Schema({
  userId: { type: String, required: true },
  schemeCode: { type: String, required: true },
  schemeName: { type: String, required: true },
  fundHouse: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

// 3. Create model
const Watchlist: Model<IWatchlist> = mongoose.models.Watchlist || mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);

export default Watchlist;
