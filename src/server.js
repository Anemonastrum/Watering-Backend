import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectMongoDB from "./configs/mongodb.js";
import mqttClient from "./mqtt/client.js";
import deviceRoutes from "./routes/device.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
await connectMongoDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes(mqttClient));

mqttClient.on("message", (topic, payload) => {
  try {
    io.emit("mqtt-data", {
      topic,
      data: JSON.parse(payload.toString())
    });
  } catch {}
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
