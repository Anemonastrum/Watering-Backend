import { mqttClient } from "../mqtt/mqttClient.js";

export const pump = (req, res) => {
  mqttClient.publish(
    "watering/iotwatering01/command/pump",
    JSON.stringify(req.body)
  );
  res.json({ ok: true });
};

export const config = (req, res) => {
  mqttClient.publish(
    "watering/iotwatering01/config/set",
    JSON.stringify(req.body),
    { retain: true }
  );
  res.json({ ok: true });
};
