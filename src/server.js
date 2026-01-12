import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { currentConfig } from "./state/currentConfig.js";


import "./mqtt/mqttClient.js";
import authRoutes from "./routes/auth.routes.js";
import telemetryRoutes from "./routes/telemetry.routes.js";
import controlRoutes from "./routes/control.routes.js";
import { verifySocketToken } from "./middlewares/socketAuth.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

io.use(verifySocketToken);
io.on("connection", socket => {
    socket.emit("config", currentConfig);
  console.log("WebSocket client connected:", socket.userId);
});

app.use("/api/auth", authRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/control", controlRoutes);

server.listen(3000, () => {
  console.log("Backend running on port 3000");
});
