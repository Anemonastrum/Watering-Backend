import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    unique: true,
    required: true
  },

  name: {
    type: String,
    default: "My Watering Device"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Device", DeviceSchema);
