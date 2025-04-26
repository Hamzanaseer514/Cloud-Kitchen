const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid"); // 🎯 UUID for unique IDs


const MenuSchema = new mongoose.Schema({
  id: { 
    type: String, 
    default: uuidv4, // 🔥 Generate Unique ID
    unique: true,
  },
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
  ingredients: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String, // Menu item image URL
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
    reviews: {
      type: [reviewsSchema],
      default: [],
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
