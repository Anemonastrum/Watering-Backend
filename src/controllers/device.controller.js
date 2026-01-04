import Device from "../models/Device.js";

export const createDevice = async (req, res) => {
  const device = await Device.create({
    ...req.body,
    owner: req.user.id
  });

  res.status(201).json(device);
};

export const getDevices = async (req, res) => {
  const devices = await Device.find({ owner: req.user.id });
  res.json(devices);
};

export const getDevice = async (req, res) => {
  const device = await Device.findOne({
    _id: req.params.id,
    owner: req.user.id
  });

  if (!device) {
    return res.status(404).json({ message: "Device not found" });
  }

  res.json(device);
};

export const updateDevice = async (req, res) => {
  const device = await Device.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );

  res.json(device);
};

export const deleteDevice = async (req, res) => {
  await Device.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id
  });

  res.json({ message: "Device removed" });
};
