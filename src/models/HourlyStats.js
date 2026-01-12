import mongoose from "mongoose";

const schema = new mongoose.Schema({
  time: Date,
  avgTemperature: Number,
  avgHumidity: Number,
  avgSoilMoisture: Number,
  avgWaterLevel: Number
});

export const HourlyStat = mongoose.model("HourlyStat", schema);
export const DailyStat = mongoose.model("DailyStat", schema);
