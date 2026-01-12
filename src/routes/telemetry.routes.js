import express from "express";
import Telemetry from "../models/Telemetry.js";
import PumpDailyStat from "../models/PumpDailyStat.js";
import {
  getPumpDaily,
  getAlerts,
  getHourlyStats,
  getDailyStats
} from "../controllers/telemetry.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/latest", async (_, res) => {
  res.json(await Telemetry.findOne().sort({ createdAt: -1 }));
});

router.get("/history", async (_, res) => {
  res.json(await Telemetry.find().sort({ createdAt: -1 }).limit(500));
});

router.get("/pump/daily", async (_, res) => {
  const stats = await PumpDailyStat
    .find()
    .sort({ day: -1 })
    .limit(30);

  res.json(stats);
});

router.get("/pump/daily", auth, getPumpDaily);
router.get("/alerts", auth, getAlerts);
router.get("/hourly", auth, getHourlyStats);
router.get("/daily", auth, getDailyStats);

export default router;
