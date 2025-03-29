const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            kitchenId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CloudKitchen",
                required: true
            },
            name: { type: String, required: true },
            image: { type: String, default: "" },  // ✅ Menu Image
            category: { type: String, required: true }, // ✅ Category
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,

    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    },
    paymentType: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Preparing", "On The Way", "Delivered", "Cancelled"],
        default: "Pending"
    },
    address: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
