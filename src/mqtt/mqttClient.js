import mqtt from "mqtt";
import Telemetry from "../models/Telemetry.js";
import Alert from "../models/Alert.js";
import { io } from "../server.js";
import PumpDailyStat from "../models/PumpDailyStat.js";

let lastPumpRunning = false;

export const mqttClient = mqtt.connect("mqtt://70.153.137.234", {
    username: "iotwatering01",
    password: "passwd"
});

mqttClient.on("connect", () => {
    console.log("MQTT connected");

    mqttClient.subscribe([
        "watering/iotwatering01/telemetry",
        "watering/iotwatering01/status",
        "watering/iotwatering01/config/state"
    ]);
});

mqttClient.on("message", async (topic, msg) => {
    const data = JSON.parse(msg.toString());

    if (topic.endsWith("/telemetry")) {
        await Telemetry.create({
            temperature: data.temperature,
            humidity: data.humidity,
            soilMoisture: data.soil_moisture,
            waterLevel: data.water_level
        });

        io.emit("telemetry", data);

        if (data.water_level < 500) {
            emitAlert("LOW_WATER", "Water level low", "critical");
        }
    }

    if (topic.endsWith("/status") && data.online === false) {
        emitAlert("DEVICE_OFFLINE", "ESP32 offline", "critical");
    }

    if (topic.endsWith("/config/state")) {
        io.emit("config", data);

        const now = new Date();
        const day = new Date(now.setHours(0, 0, 0, 0));

        let stat = await PumpDailyStat.findOne({ day });
        if (!stat) {
            stat = await PumpDailyStat.create({ day });
        }

        if (!lastPumpRunning && data.pump_running) {
            stat.activations += 1;
            stat.lastStart = new Date();
            await stat.save();
        }

        if (lastPumpRunning && !data.pump_running && stat.lastStart) {
            const seconds =
                (Date.now() - stat.lastStart.getTime()) / 1000;

            stat.runtimeSeconds += Math.floor(seconds);
            stat.lastStart = null;
            await stat.save();
        }

        lastPumpRunning = data.pump_running;
    }
});

async function emitAlert(type, message, level) {
    const alert = await Alert.create({ type, message, level });
    io.emit("alert", alert);
}
