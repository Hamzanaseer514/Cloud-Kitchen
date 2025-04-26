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

    req.userData = user; // Attach user data to req

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
      let menuCount = 0; // Reset menu count
    
      const subscriptionStart = user.subscription?.startDate ? new Date(user.subscription.startDate) : null;
      kitchens.forEach(kitchen => {
        let recentMenus;
        
        if (user.subscription.plan === 'free') {
          // For free plan, count all menus ever uploaded
          recentMenus = kitchen.menus;
        } else {
          // For paid plans, count menus uploaded after subscription start
          recentMenus = kitchen.menus.filter(menu => {
            if (!menu.createdAt || !subscriptionStart) return false;
            return new Date(menu.createdAt) >= subscriptionStart;
          });
        }
      
        menuCount += recentMenus.length;
      });

      // Determine the subscription plan and remaining menu slots
      let maxMenusAllowed = 1;
      if (user.subscription.plan === 'free') {
        maxMenusAllowed = 5;
      } else if (user.subscription.plan === 'Basic') {
        maxMenusAllowed = 10;
      } else if (user.subscription.plan === 'Advance') {
        maxMenusAllowed = 30;
      }

      // Calculate the number of menus left based on plan
      const menusLeft = maxMenusAllowed - menuCount;

      let isWithinLimit = true;
      if (menusLeft <= 0) {
        isWithinLimit = false;
        return res.status(403).json({ message: "Subscription limit reached. Please upgrade your plan." });
      }

      req.userData.menusLeft = menusLeft; // Attach remaining menus to user data
    }

    next();
  } catch (err) {
    console.error("Subscription check error:", err);
    res.status(500).json({ message: "Subscription check failed" });
  }
};

module.exports = checkSubscription;
