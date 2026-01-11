export const updateConfig = (mqttClient) => (req, res) => {
  mqttClient.publish(
    `watering/${process.env.DEVICE_ID}/config`,
    JSON.stringify(req.body),
    { qos: 1, retain: true }
  );

  res.json({ success: true });
};

export const controlPump = (mqttClient) => (req, res) => {
  mqttClient.publish(
    `watering/${process.env.DEVICE_ID}/command/pump`,
    JSON.stringify(req.body),
    { qos: 1 }
  );

  res.json({ success: true });
};
