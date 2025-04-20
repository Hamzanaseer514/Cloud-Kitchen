const User = require("../models/User");

const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If subscription expired, update it
    if (user.subscription?.isPremium && new Date(user.subscription.endDate) < new Date()) {
      user.subscription.isPremium = false;
      user.subscription.plan = 'free';
      user.subscription.price = 0;
      user.subscription.startDate = null;
      user.subscription.endDate = null;
      await user.save();
    }

    next();
  } catch (err) {
    console.error("Subscription check error:", err);
    res.status(500).json({ message: "Subscription check failed" });
  }
};

module.exports = checkSubscription;
