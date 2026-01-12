import express from "express";
import { pump, config } from "../controllers/control.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/pump", auth, pump);
router.post("/config", auth, config);
export default router;
