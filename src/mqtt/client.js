import mqtt from "mqtt";
import Telemetry from "../models/Telemetry.js";
import Alert from "../models/Alert.js";

const client = mqtt.connect(process.env.MQTT_URL, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD
});

client.on("connect", () => {
  console.log("MQTT connected");

  client.subscribe([
    `watering/${process.env.DEVICE_ID}/telemetry`,
    `watering/${process.env.DEVICE_ID}/status`
  ]);
});

client.on("message", async (topic, payload) => {
  let data;
  try {
    data = JSON.parse(payload.toString());
  } catch {
    return;
  }

  if (topic.includes("telemetry")) {
    await Telemetry.create({
      deviceId: process.env.DEVICE_ID,
      ...data
    });

    if (data.water_level <= Number(process.env.WATER_MIN_LEVEL)) {
      await Alert.create({
        deviceId: process.env.DEVICE_ID,
        type: "WATER_EMPTY",
        message: "Water tank level is below minimum"
      });
    }
  }
});

export default client;
