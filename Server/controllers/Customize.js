const CustomOrder = require("../models/CustomOrder");

// ✅ Custom Order Add Karne Ka Function
const addCustomOrder = async (req, res) => {
    try {
        const { userId, kitchenId, dishName, spiceLevel, ingredients, cookingMethod, servingSize, extraAddons, specialInstructions } = req.body;

        // ✅ Validation (Check if required fields are provided)
        if (!userId || !kitchenId || !dishName || !spiceLevel || !ingredients || !cookingMethod || !servingSize) {
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
            extraAddons: extraAddons || [],
            specialInstructions: specialInstructions || ""
        });

        // ✅ Save Order in Database
        await order.save();

        res.status(201).json({ message: "Custom order placed successfully!", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addCustomOrder };
