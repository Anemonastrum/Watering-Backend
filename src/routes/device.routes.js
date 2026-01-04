import { Router } from "express";
import {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice
} from "../controllers/device.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", createDevice);
router.get("/", getDevices);
router.get("/:id", getDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;
