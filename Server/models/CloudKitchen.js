const mongoose = require("mongoose");

// Embedded Schema for Menus
const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients:{
    type: String,
    default: "",
  },
  rating:{
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String, // Menu item image URL
    default: "",
  },
});

// Kitchen Schema
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
    menus: {
      type: [MenuSchema], // 👈 Array of menu items
      default: [],
    },
  },
  { timestamps: true }
);

const Kitchen = mongoose.model("Kitchen", KitchenSchema);

// ✅ CommonJS Export
module.exports = Kitchen;
