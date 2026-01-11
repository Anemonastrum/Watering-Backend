import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateConfig, controlPump } from "../controllers/device.controller.js";

const router = express.Router();

export default (mqttClient) => {
  router.post("/config", authMiddleware, updateConfig(mqttClient));
  router.post("/pump", authMiddleware, controlPump(mqttClient));
  return router;
};
