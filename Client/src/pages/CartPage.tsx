import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QM8InGrY1JqG9Bl9huwlyiEbRMfBJ1L53aH513B5LKQkT6hFBlrswOpltUyXzn3jZyRpwG633LQHMdbegVFiRui00rtF0Slhe");

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }
  
    try {
      const stripe = await stripePromise;
      
      const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }), // Ensure this matches backend expectations
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const session = await response.json();
  
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("Session URL not found:", session);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/menu" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Cart Items ({totalItems})
                    </h2>
                    <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <motion.div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
                        <div className="h-20 w-20 rounded-lg overflow-hidden mr-4 mb-4 sm:mb-0 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                          <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-600 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800 font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-lg font-semibold text-orange-500">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button onClick={handleCheckout} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/menu" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center">
              Browse Our Menu
              <ArrowLeft className="h-4 w-4 ml-2 transform rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;