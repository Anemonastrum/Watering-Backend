import mqtt from "mqtt";
import Telemetry from "../models/Telemetry.js";
import Alert from "../models/Alert.js";

// SINGLE shared MQTT client
const client = mqtt.connect("mqtt://70.153.137.234:1883", {
  username: "iotwatering01",
  password: "passwd",
  clientId: `backend-${Date.now()}`,
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 5000
});

client.on("connect", () => {
  console.log("MQTT connected");

  client.subscribe(
    [
      "watering/iotwatering01/telemetry",
      "watering/iotwatering01/status"
    ],
    (err) => {
      if (err) {
        console.error("MQTT subscribe error:", err.message);
      } else {
        console.log("MQTT subscribed to telemetry and status");
      }
    }
  );
});

client.on("reconnect", () => {
  console.log("MQTT reconnecting...");
});

client.on("close", () => {
  console.log("MQTT connection closed");
});

client.on("error", (err) => {
  console.error("MQTT error:", err.message);
});

client.on("message", async (topic, payload) => {
  let data;
  try {
    data = JSON.parse(payload.toString());
  } catch {
    console.error("Invalid JSON MQTT payload:", payload.toString());
    return;
  }

  // TELEMETRY
  if (topic.includes("/telemetry")) {
    console.log("MQTT telemetry received:", data);

    await Telemetry.create({
      deviceId: "iotwatering01",
      ...data
    });

    if (data.water_level <= Number(process.env.WATER_MIN_LEVEL)) {
      await Alert.create({
        deviceId: "iotwatering01",
        type: "WATER_EMPTY",
        message: "Water tank level is below minimum"
      });
    }
  }
});

export default client;
