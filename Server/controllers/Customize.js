const CustomOrder = require("../models/CustomOrder");
const Kitchen = require("../models/CloudKitchen");

// ✅ Custom Order Add Karne Ka Function
const addCustomOrder = async (req, res) => {
    try {
        const { kitchenId, dishName, spiceLevel, ingredients, cookingMethod, servingSize, specialInstructions } = req.body;
        const userId = req.user.id;

        // ✅ Validation (Check if required fields are provided)
        if (!kitchenId || !dishName || !spiceLevel || !ingredients || !cookingMethod || !servingSize) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // ✅ New Order Create
        const order = new CustomOrder({
            userId,
            kitchenId,
            dishName,
            spiceLevel,
            ingredients,
            cookingMethod,
            servingSize,
            // extraAddons: extraAddons || [],
            specialInstructions: specialInstructions || ""
        });

        // ✅ Save Order in Database
        await order.save();

        res.status(201).json({ message: "Custom order placed successfully!", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCustomOrdersForSpecificKitchen = async (req, res) => {
    try {
        const userId = req.user.id;

        // ✅ Step 1: Find Kitchen owned by the user
        const kitchen = await Kitchen.findOne({ owner:userId  });

        if (!kitchen) {
            return res.status(404).json({ error: "No kitchen found for this owner" });
        }

        // ✅ Step 2: Get Orders & Populate User Details (name, email)
        const orders = await CustomOrder.find({ kitchenId: kitchen._id })
            .populate("userId", "name email"); // Jo fields chahiye, woh likh do

        res.status(200).json({ message: "Custom orders retrieved successfully!", orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addCustomOrder,getCustomOrdersForSpecificKitchen };
