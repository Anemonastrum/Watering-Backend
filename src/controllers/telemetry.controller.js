import Telemetry from "../models/Telemetry.js";
import Alert from "../models/Alert.js";
import PumpDailyStat from "../models/PumpDailyStat.js";
import HourlyStat from "../models/HourlyStat.js";
import DailyStat from "../models/DailyStat.js";

/**
 * GET /telemetry/pump/daily
 * Daily pump activations + runtime
 */
export const getPumpDaily = async (req, res) => {
  const stats = await PumpDailyStat
    .find()
    .sort({ day: -1 })
    .limit(30);

  res.json(stats);
};

/**
 * GET /telemetry/alerts
 * Alert history
 */

export const getAlerts = async (req, res) => {
  const alerts = await Alert
    .find({ status: "active" })
    .sort({ createdAt: -1 })
    .limit(100);

  if (alerts.length === 0) {
    return res.json([
      {
        type: "SYSTEM_OK",
        message: "System OK",
        level: "",
        status: "active",
        createdAt: new Date()
      }
    ]);
  }

  res.json(alerts);
};

/**
 * GET /telemetry/hourly
 * Hourly averaged telemetry
 */
export const getHourlyStats = async (req, res) => {
  const stats = await HourlyStat
    .find()
    .sort({ hour: -1 })
    .limit(24);

  res.json(stats);
};

/**
 * GET /telemetry/daily
 * Daily averaged telemetry
 */
export const getDailyStats = async (req, res) => {
  const stats = await DailyStat
    .find()
    .sort({ day: -1 })
    .limit(30);

  res.json(stats);
};
