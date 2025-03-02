import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function generateOrderId(): string {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function calculateDeliveryTime(distance: number): number {
  // Assuming average speed of 20km/h and 10 minutes for food preparation
  const travelTimeMinutes = (distance / 20) * 60;
  const preparationTime = 10;
  return Math.ceil(travelTimeMinutes + preparationTime);
}