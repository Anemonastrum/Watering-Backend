import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import deviceRoutes from "./routes/device.routes.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
