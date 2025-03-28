import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CartItem = {
  _id: string;
  kitchenId: string
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  ingredients: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);


  const user = JSON.parse(localStorage.getItem("cloudKitchenUser") || "{}");
  const userId = user?.id;
  const token = localStorage.getItem("token");

  const syncCartWithBackend = useCallback(async (updatedCart: CartItem[]) => {
    if (!userId || !token) return;

    try {
      await fetch("http://localhost:5000/api/auth/updatecart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, cartItems: updatedCart }),
      });
    } catch (err) {
      console.error("❌ Cart update failed:", err);
    }
  }, [userId, token]);

  
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId || !token) return;

      try {
        const response = await fetch("http://localhost:5000/api/auth/getcart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success && data.cart) {
          setItems(data.cart);
        }
      } catch (error) {
        console.error("❌ Error loading cart:", error);
      }
    };

    fetchCart();
  }, [userId, token]);

  // ✅ **Add Item to Cart**
  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === newItem._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevItems.map((item) =>
          item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevItems, { ...newItem, quantity: 1 }];
      }

      syncCartWithBackend(updatedCart);
      return updatedCart;
    });
  };

  
  const removeItem = (_id: string) => {
    setItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item._id !== _id);
      syncCartWithBackend(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    setItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      syncCartWithBackend(updatedCart);
      return updatedCart;
    });
  };

  
  const clearCart = () => {
    setItems([]);
    syncCartWithBackend([]);
  };

  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🏷️ **Custom Hook for Using Cart Context**
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
