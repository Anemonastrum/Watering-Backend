import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    deviceId: {
      type: String,
      required: true,
      unique: true
    },
    name: { type: String, required: true },
    location: String,
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },
    config: {
      autoMode: { type: Boolean, default: true },
      soilThreshold: { type: Number, default: 40 },
      wateringDuration: { type: Number, default: 10 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Device", deviceSchema);
