
const OrderHistory = require('../models/OrderHistory');
const User = require('../models/User');
const CloudKitchen = require('../models/CloudKitchen');
const Rider = require("../models/Rider")

const getavailableOrderForRider = async (req, res) => {
    try {
        // Fetch orders and populate userId with name and email
        const orders = await OrderHistory.find({ status: "On The Way" })
            .populate("userId", "fullname email phone") // Populate name and email from User collection
            .exec();

        res.status(200).json(orders); // Send orders with populated user data
    } catch (error) {
        res.status(500).json({ message: "Server error!", error });
    }
};


const RiderAcceptedOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params; // Get orderId from request parameters
        const riderId = req.user.id; // Get riderId from authenticated user
        console.log("Rider Accepted Order Request:", orderId, riderId); // Log the request body for debugging

        // Update the order with RiderId and set RiderAcceptedOrder to true
        const updatedOrder = await OrderHistory.findOneAndUpdate(
            { _id: orderId }, // Explicitly query by _id
            { RiderId: riderId, RiderAcceptedOrder: true }, // Fields to update
            { new: true } // Return the updated order
        );


        console.log("Updated Order:", updatedOrder); // Log the updated order for debugging
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found!" });
        }

        console.log("Updated Order:", updatedOrder); // Log the updated order for debugging

        res.status(200).json({ message: "Order accepted successfully!", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error!", error });
    }
};
const RiderDeliveredOrder = async (req, res) => {
    try {
        const { id: orderId } = req.params;
        const { status } = req.body;
        const riderId = req.user.id;  // Logged-in Rider's ID

        console.log("Order ID:", orderId);
        console.log("Rider ID:", riderId);

        // Step 1: Fetch Order First
        const order = await OrderHistory.findById(orderId);

        // Step 2: Check if Order Exists
        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        // Step 3: Check if the order is assigned to the logged-in rider
        if (!order.RiderId || order.RiderId.toString() !== riderId) {

            return res.status(403).json({ message: "You are not authorized to update this order!" });

        }

        // Step 4: Update Order Status
        order.status = status;
        await order.save();

        console.log("Updated Order:", order);
        res.status(200).json({ message: "Order delivered successfully!", updatedOrder: order });

    } catch (error) {
        console.error("Error in RiderDeliveredOrder:", error);
        res.status(500).json({ message: "Server error!", error });
    }
};

const getOrdersWithRiderInfo = async (req, res) => {
    try {
        // 1. User ki ID se chef ka kitchenId fetch karo
        const userId = req.user.id;
        const user = await CloudKitchen.findOne({ owner: userId });
        console.log('User:', user); // Debugging line

        if (!user) {
            return res.status(404).json({ message: 'Kitchen not found for this user' });
        }

        const kitchenId = user._id;
        console.log('Kitchen ID:', kitchenId); // Debugging line

        // Kitchen ID ke saath related orders fetch karo
        const orders = await OrderHistory.find({
            items: {
              $elemMatch: {
                kitchenId: kitchenId
              }
            }
          })
          .populate({
            path: 'RiderId',
            select: 'fullname email phone'
          })
          .lean();
          

        console.log('Step 1 - Orders with Riders:', JSON.stringify(orders, null, 2));
        const riderIds = orders.map(order => order.RiderId?._id).filter(id => id);

        const riders = await Rider.find({ userid: { $in: riderIds } })
            .select('userid license vehicle')
            .lean();

        console.log('Step 2 - Riders:', JSON.stringify(riders, null, 2));


        // Agar orders nahi milte
        // if (!orders || orders.length === 0) {
        //     return res.status(404).json({ message: 'No orders found for this kitchen' });
        // }

        // 3. Orders ke saath rider ki information ko response mein bhejo
        const ordersWithRiders = orders.map(order => {
            const riderDetails = riders.find(r => String(r.userid) === String(order.RiderId?._id)) || {};
          
            return {
              orderId: order._id,
              orderItems: order.items,
              orderStatus: order.status,
              RiderName: order.RiderId?.fullname || 'N/A',
              RiderEmail: order.RiderId?.email || 'N/A',
              RiderPhone: order.RiderId?.phone || 'N/A',
              RiderLicense: riderDetails.license || 'N/A',
              RiderVehicle: riderDetails.vehicle || 'N/A',
              deliveryPrice: order.deliveryPrice,
              totalPrice: order.totalPrice,
            };
          });
          
          return res.status(200).json({ orders: ordersWithRiders });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};







module.exports = { getavailableOrderForRider, RiderAcceptedOrder, RiderDeliveredOrder, getOrdersWithRiderInfo };
