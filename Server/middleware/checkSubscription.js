// const User = require("../models/User");

// const checkSubscription = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // If subscription expired, update it
//     if (user.subscription?.isPremium && new Date(user.subscription.endDate) < new Date()) {
//       user.subscription.isPremium = false;
//       user.subscription.plan = 'free';
//       user.subscription.price = 0;
//       user.subscription.startDate = null;
//       user.subscription.endDate = null;
//       await user.save();
//     }

//     next();
//   } catch (err) {
//     console.error("Subscription check error:", err);
//     res.status(500).json({ message: "Subscription check failed" });
//   }
// };


// // const validateMenuUpload = async (req, res, next) => {
// //   const chefId = req.user.id;
// //   const chef = await Chef.findById(chefId);

// //   const freeLimit = 5;
// //   const currentDate = new Date();

// //   const hasActiveSubscription = chef.subscription.expiresAt && chef.subscription.expiresAt > currentDate;

// //   if (chef.menusUploaded >= freeLimit && !hasActiveSubscription) {
// //     return res.status(403).json({ 
// //       message: "Free limit exceeded. Please purchase a premium plan to upload more menus." 
// //     });
// //   }

// //   next();
// // };

// module.exports = checkSubscription;

const User = require("../models/User");
const Kitchen = require("../models/CloudKitchen"); // Correct Model

const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userData = user; // 🔥 Attach user data to req

    // Check subscription expiry and reset to free if expired
    if (user.subscription?.isPremium && new Date(user.subscription.endDate) < new Date()) {
      user.subscription.isPremium = false;
      user.subscription.plan = 'free';
      user.subscription.price = 0;
      user.subscription.startDate = null;
      user.subscription.endDate = null;
      await user.save();
    }

    if (user.role === "chef" && user.subscription.plan !== 'Pro') {
      const kitchens = await Kitchen.find({ owner: user._id });
      let menuCount = 0;
    
      const subscriptionStart = user.subscription?.startDate ? new Date(user.subscription.startDate) : null;

      kitchens.forEach(kitchen => {
        const recentMenus = kitchen.menus.filter(menu => {
          if (!menu.createdAt || !subscriptionStart) return false;
          return new Date(menu.createdAt) >= subscriptionStart;
        });
        menuCount += recentMenus.length;
      });
      
    
      const currentDate = new Date();
      let isWithinLimit = true;
    
      if (user.subscription.plan === 'free') {
        if (menuCount >= 5) {
          isWithinLimit = false;
        }
      } else if (user.subscription.plan === 'Basic') {
        if (menuCount >= 10) {
          isWithinLimit = false;
        }
      } else if (user.subscription.plan === 'Advance') {
        if (menuCount >= 30) {
          isWithinLimit = false;
        }
      }
    
      console.log("Menus counted from subscription start:", menuCount);
    
      if (!isWithinLimit) {
        return res.status(403).json({ message: "Subscription limit reached. Please upgrade your plan." });
      }
    }
        next();
  } catch (err) {
    console.error("Subscription check error:", err);
    res.status(500).json({ message: "Subscription check failed" });
  }
};


module.exports = checkSubscription;
