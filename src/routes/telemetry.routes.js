import express from "express";
import Telemetry from "../models/Telemetry.js";

const router = express.Router();

router.get("/latest", async (_, res) => {
  res.json(await Telemetry.findOne().sort({ createdAt: -1 }));
});

router.get("/history", async (_, res) => {
  res.json(await Telemetry.find().sort({ createdAt: -1 }).limit(500));
});

import PumpDailyStat from "../models/PumpDailyStat.js";

router.get("/pump/daily", async (_, res) => {
  const stats = await PumpDailyStat
    .find()
    .sort({ day: -1 })
    .limit(30);

  res.json(stats);
});

export default router;
