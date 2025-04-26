const Kitchen = require("../models/CloudKitchen");
const OrderHistory = require("../models/orderHistory");

// ✅ Register a new kitchen
const registerKitchen = async (req, res) => {
  try {
    const {
      kitchenName,
      openingTime,
      closingTime,
      specification,
      userImage,
      kitchenLogo,
      approve,
      status,
    } = req.body;
    console.log(kitchenLogo,userImage)

    // Validation
    if (!kitchenName || !openingTime || !closingTime || !specification) {
      return res.status(400).json({ status: false, message: "Required fields are missing!" });
    }

    let menues = [];

    // Create new kitchen
    const newKitchen = new Kitchen({
      kitchenName,
      owner: req.user.id,
      openingTime,
      closingTime,
      specification,
      userImage,
      kitchenLogo,
      status,
      approve,
      menues,
    });

    await newKitchen.save();

    res.status(201).json({ status: true, message: "Kitchen registered successfully!", kitchen: newKitchen });

  } catch (error) {
    res.status(500).json({ status: false, message: "Server error!", error: error.message });
  }
};

// ✅ Get all kitchens
const getAllKitchens = async (req, res) => {
  try {
    const kitchens = await Kitchen.find().populate("owner", "fullname email");
    res.status(200).json(kitchens);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get single kitchen by ID
const getKitchenById = async (req, res) => {
  try {
    const kitchen = await Kitchen.findById(req.params.id).populate("owner", "fullname email");
    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }
    res.status(200).json(kitchen);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Update kitchen
const updateKitchen = async (req, res) => {
  console.log("hamza i am update");
  try {
    const updatedKitchen = await Kitchen.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedKitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }
    res.status(200).json({ message: "Kitchen updated successfully!", kitchen: updatedKitchen });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Delete kitchen
const deleteKitchen = async (req, res) => {
  try {
    const deletedKitchen = await Kitchen.findByIdAndDelete(req.params.id);
    if (!deletedKitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }
    res.status(200).json({ message: "Kitchen deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Check if chef has a kitchen and it's approved
const chkChefKitchen = async (chefid) => {
  try {
    const kitchen = await Kitchen.findOne({ owner: chefid });

    if (!kitchen || kitchen.approve === "no") {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const AddMenu = async (req, res) => {
  try {
    // ✅ User ID JWT سے نکالنا
    const userId = req.user.id; // Middleware se token verify hone ke baad `req.user` me ID mil jaye gi

    // ✅ Kitchen Find karna (Jisme owner ka ID match kare)
    const kitchen = await Kitchen.findOne({ owner: userId });

    if (!kitchen) {
      return res.status(404).json({ message: "No kitchen found for this user" });
    }

    // ✅ Request Body se Data Lena
    const { name, price, category, ingredients, description, image } = req.body;

    // ✅ New Menu Item Object
    const newMenuItem = {
      name,
      price,
      category,
      ingredients,
      description,
      image,
    };

    // ✅ Mongoose `$push` se menu add karna
    kitchen.menus.push(newMenuItem);
    await kitchen.save(); // Save to DB

    res.status(200).json({ message: "Menu item added successfully", kitchen });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getKitchenMenus = async (req, res) => {
  try {
    const kitchen = await Kitchen.findById(req.params.id);

    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }

    res.status(200).json(kitchen.menus);  // ✅ Only return the menus array
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

const GetAllOrderAccordingToKitchen = async (req, res, next) => {
  const userId = req.user.id;
  const kitchen = await Kitchen.findOne({ owner: userId });
  if (!kitchen) {
    return res.status(404).json({ error: "No kitchen found for this owner" });
  }
  const orders = await OrderHistory.find({
    items: { $elemMatch: { kitchenId: kitchen._id } } // ✅ Match kitchenId inside items array
  }).populate("userId", "name email"); // ✅ Populate user details

  res.status(200).json({ message: "Orders retrieved successfully!", orders });

}

const getAllOrderofSpecificUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ensure orders are fetched properly
    const orders = await OrderHistory.find({ userId: userId });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found", success: false });
    }

    res.status(200).json({ message: "Orders found", success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

const updateuserOrderStatus = async (req, res) => {
  try {
    const { status, id, deliveryPrice } = req.body;
    console.log(id, status, deliveryPrice);

    const updateData = {
      ...(status && { status }),
      ...(deliveryPrice && { deliveryPrice }),
    };

    const updatedOrder = await OrderHistory.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    console.log(updatedOrder);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully!", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//// Review Functionality ////
// ✅ Add a review to a kitchen

const addKitchenReview = async(req,res) => {
  try {
    const { kitchenId, rating, comment } = req.body;
    const userId = req.user.id; // JWT se user ID lena
    // console.log(req.body)

    // Kitchen ko find karo
    const kitchen = await Kitchen.findById(kitchenId);
    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }

    // Review ko kitchen ke reviews array me push karo
    kitchen.reviews.push({ userId, rating, comment });
    await kitchen.save();
    // console.log(kitchen)

    res.status(200).json({ message: "Review added successfully!", kitchen });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
}

const fetchReviewOfSpecificKitchen = async (req, res) => {
  try {
    const kitchenId = req.params.id; // Kitchen ID from request params

    // Kitchen ko find karo
    const kitchen = await Kitchen.findById(kitchenId).populate("reviews.userId", "fullname email"); // Populate user details

    if (!kitchen) {
      return res.status(404).json({ message: "Kitchen not found!" });
    }
    console.log(kitchen.reviews)
    res.status(200).json(kitchen.reviews); // Return the reviews array
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
}

const getAllReviewsOfKitchen = async (req,res) => {
try {
  const kitchen = await Kitchen.find({}).populate("reviews.userId", "fullname email"); // Populate user details
  if (!kitchen) {
    return res.status(404).json({ message: "Kitchen not found!" });
  }

  console.log(kitchen)
  return res.status(201).json({message:"all kitchens",kitchen})
} catch (error) {
  return res.status(500).json({ message: "Server error!", error: error.message });``
}
}

const saveUserSubscription = async (req, res, next) => {
  const { planName, price } = req.body;
  const userId = req.user.id;

  // Convert internal planName to enum plan
  const planMap = {
    Basic: 'Basic',
    Advance: 'Advance',
    Pro: 'Pro',
  };

  const selectedPlan = planMap[planName];

  if (!selectedPlan) {
    return res.status(400).json({ message: 'Invalid plan name' });
  }

  const now = new Date();
  let endDate = new Date(now);

  if (selectedPlan === 'Basic') {
    endDate.setDate(endDate.getDate() + 7); // Weekly
  } else if (selectedPlan === 'Advance') {
    endDate.setMonth(endDate.getMonth() + 1); // Monthly
  } else if (selectedPlan === 'Pro') {
    endDate.setFullYear(endDate.getFullYear() + 1); // Yearly
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      subscription: {
        isPremium: true,
        price,
        plan: selectedPlan,
        startDate: now,
        endDate,
      },
    },
    { new: true }
  );

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: `Subscription plan '${selectedPlan}' saved successfully.`,
    subscription: user.subscription,
  });
};


// ✅ CommonJS Export
module.exports = {
  registerKitchen,
  getAllKitchens,
  getKitchenById,
  updateKitchen,
  deleteKitchen,
  chkChefKitchen,
  AddMenu,
  getKitchenMenus,
  GetAllOrderAccordingToKitchen,
  updateuserOrderStatus,
  getAllOrderofSpecificUser,
  addKitchenReview,
  fetchReviewOfSpecificKitchen,
  getAllReviewsOfKitchen,
  saveUserSubscription,
};
