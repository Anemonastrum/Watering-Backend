import mongoose from "mongoose";

const DailyStatSchema = new mongoose.Schema({
  day: Date,
  avgTemperature: Number,
  avgHumidity: Number,
  avgSoilMoisture: Number,
  avgWaterLevel: Number
});

export default mongoose.model("DailyStat", DailyStatSchema);
