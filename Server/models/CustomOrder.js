const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    kitchenId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "CloudKitchen",  // 🔥 Reference to Kitchen Model
        required: true 
    },
    dishName: { 
        type: String, 
        required: true 
    },
    spiceLevel: { 
        type: String, 
        enum: ["Mild", "Medium", "Spicy", "Extra Spicy"], 
        required: true 
    },
    ingredients: { 
        type: [String], 
        required: true 
    },
    cookingMethod: { 
        type: String, 
        enum: ["Grilled", "Fried", "Boiled", "Baked"], 
        required: true 
    },
    servingSize: { 
        type: String, 
        enum: ["Single", "Family", "Party Size"], 
        required: true 
    },
    extraAddons: { 
        type: [String], 
        default: [] 
    },
    specialInstructions: { 
        type: String, 
        default: "" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);

module.exports = CustomOrder;
