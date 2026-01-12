import mongoose from "mongoose";

const HourlyStatSchema = new mongoose.Schema({
  hour: Date,
  avgTemperature: Number,
  avgHumidity: Number,
  avgSoilMoisture: Number,
  avgWaterLevel: Number
});

export default mongoose.model("HourlyStat", HourlyStatSchema);
