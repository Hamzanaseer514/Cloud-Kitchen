const Kitchen = require("../models/CloudKitchen");

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
      rating,
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
      rating,
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


// ✅ CommonJS Export
module.exports = {
  registerKitchen,
  getAllKitchens,
  getKitchenById,
  updateKitchen,
  deleteKitchen,
  chkChefKitchen,
  AddMenu
};
