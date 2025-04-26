const express = require("express");
const dotenv = require("dotenv");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config(); // Load environment variables from .env file
// Create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { planName, price, type } = req.body; // Get the plan name and price from the request body

    if (!planName || !price) {
      return res.status(400).json({ error: "Missing plan name or price" });
    }


    const amount = Math.round(price * 100);  

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: planName,
              images: ["https://plus.unsplash.com/premium_vector-1682301003186-0600ac1fbf19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D"] 
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?role=chef&type=${type}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel?role=chef&type=chatbot`,
    });


    res.json({ id: session.id }); 
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
