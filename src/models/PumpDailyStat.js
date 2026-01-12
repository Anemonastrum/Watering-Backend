import mongoose from "mongoose";

const PumpDailyStatSchema = new mongoose.Schema({
  day: { type: Date, unique: true },
  activations: { type: Number, default: 0 },
  runtimeSeconds: { type: Number, default: 0 },
  lastStart: Date
});

export default mongoose.model("PumpDailyStat", PumpDailyStatSchema);
