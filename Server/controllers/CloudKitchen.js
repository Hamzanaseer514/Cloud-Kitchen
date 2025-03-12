import Kitchen from "../models/CloudKitchen.js";

// ✅ Register a new kitchen
export const registerKitchen = async (req, res) => {
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
  
      // Validation
      if (!kitchenName  || !openingTime || !closingTime || !specification) {
        return res.status(400).json({ status: false, message: "Required fields are missing!" });
      }
  
      // Create new kitchen
      const newKitchen = new Kitchen({
        kitchenName,
        owner:req.user.id,
        openingTime,
        closingTime,
        specification,
        userImage:"hamza.jpg",
        kitchenLogo:"logo.jpg",
        status,
        approve,
        rating,
      });
  
      await newKitchen.save();
      res.status(201).json({ status: true, message: "Kitchen registered successfully!", kitchen: newKitchen });
  
    } catch (error) {
      res.status(500).json({ status: false, message: "Server error!", error: error.message });
    }
  };
  

// ✅ Get all kitchens
export const getAllKitchens = async (req, res) => {
  try {
    const kitchens = await Kitchen.find().populate("owner", "fullname email");
    res.status(200).json(kitchens);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Get single kitchen by ID
export const getKitchenById = async (req, res) => {
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
export const updateKitchen = async (req, res) => {
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
export const deleteKitchen = async (req, res) => {
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
