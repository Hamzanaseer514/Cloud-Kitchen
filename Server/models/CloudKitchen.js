import mongoose from "mongoose";

const KitchenSchema = new mongoose.Schema(
  {
    kitchenName: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Chef/User ki ID
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    userImage: {
      type: String, // Image URL
      default: "",
    },
    kitchenLogo: {
      type: String, // Logo URL
      default: "",
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    approve: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Kitchen = mongoose.model("Kitchen", KitchenSchema);
export default Kitchen;
