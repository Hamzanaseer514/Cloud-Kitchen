import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, FoodItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem, quantity: number, customizations?: CartItem['customizations'], specialInstructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cloudKitchenCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cloudKitchenCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (
    foodItem: FoodItem,
    quantity: number,
    customizations?: CartItem['customizations'],
    specialInstructions?: string
  ) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.foodItem.id === foodItem.id && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { foodItem, quantity, customizations, specialInstructions }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.foodItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.foodItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce((total, item) => {
    const itemPrice = item.foodItem.price;
    const customizationPrice = item.customizations?.reduce((acc, customization) => {
      const option = item.foodItem.customizationOptions?.find(opt => opt.id === customization.optionId);
      const choice = option?.options.find(choice => choice.id === customization.choiceId);
      return acc + (choice?.price || 0);
    }, 0) || 0;
    
    return total + ((itemPrice + customizationPrice) * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};