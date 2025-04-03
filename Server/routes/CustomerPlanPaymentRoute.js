require('dotenv').config();
const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { planName, price } = req.body; 

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
                description: "Unlock premium benefits and elevate your Cloud Kitchen experience today! Enjoy exclusive features and seamless management for your kitchen.",
                images: [
                  "https://images.unsplash.com/vector-1739647326753-fe8c6e6e81e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWYlMjBoYXR8ZW58MHx8MHx8fDA%3D",
                ],
              },
              unit_amount: amount, 
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        metadata: {
          planName: planName,
          price: price,
        },
      });
      


    res.json({ id: session.id }); 
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
