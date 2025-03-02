export type UserRole = 'customer' | 'chef' | 'rider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface Chef extends User {
  role: 'chef';
  bio: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  earnings: number;
}

export interface Rider extends User {
  role: 'rider';
  isAvailable: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  vehicleType: string;
  vehicleNumber: string;
  deliveriesCompleted: number;
  rating: number;
}

export interface FoodItem {
  id: string;
  chefId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  isVegetarian: boolean;
  isAvailable: boolean;
  customizationOptions?: CustomizationOption[];
  rating: number;
  totalReviews: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  customizations?: {
    optionId: string;
    choiceId: string;
  }[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  customerId: string;
  chefId: string;
  riderId?: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  createdAt: Date;
  estimatedDeliveryTime?: number;
  actualDeliveryTime?: Date;
}

export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'preparing' 
  | 'ready_for_pickup' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'cash' | 'card' | 'wallet';

export interface Review {
  id: string;
  userId: string;
  orderId: string;
  foodItemId: string;
  chefId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}