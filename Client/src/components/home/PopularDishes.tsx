import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice } from '../../lib/utils';

// Mock data for popular dishes
const POPULAR_DISHES = [
  {
    id: '1',
    name: 'Homemade Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Ahmed Khan',
    chefId: '2',
    price: 14.99,
    rating: 4.9,
    reviews: 128,
    preparationTime: 40,
    category: 'Indian',
    isVegetarian: false,
  },
  {
    id: '2',
    name: 'Authentic Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Maria Johnson',
    chefId: '1',
    price: 12.99,
    rating: 4.8,
    reviews: 96,
    preparationTime: 30,
    category: 'Italian',
    isVegetarian: false,
  },
  {
    id: '3',
    name: 'Vegetable Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Sophia Chen',
    chefId: '3',
    price: 11.99,
    rating: 4.7,
    reviews: 84,
    preparationTime: 25,
    category: 'Asian',
    isVegetarian: true,
  },
  {
    id: '4',
    name: 'Homestyle Enchiladas',
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Elena Rodriguez',
    chefId: '4',
    price: 13.99,
    rating: 4.6,
    reviews: 72,
    preparationTime: 35,
    category: 'Mexican',
    isVegetarian: false,
  },
  {
    id: '5',
    name: 'Homemade Butter Chicken',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Ahmed Khan',
    chefId: '2',
    price: 15.99,
    rating: 4.9,
    reviews: 112,
    preparationTime: 45,
    category: 'Indian',
    isVegetarian: false,
  },
  {
    id: '6',
    name: 'Classic Tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    chef: 'Maria Johnson',
    chefId: '1',
    price: 8.99,
    rating: 4.8,
    reviews: 64,
    preparationTime: 20,
    category: 'Dessert',
    isVegetarian: true,
  },
];

const PopularDishes: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Most Popular Dishes
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most loved homemade dishes from our talented chefs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_DISHES.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                {dish.isVegetarian && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Vegetarian
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                    <Link to={`/chef/${dish.chefId}`} className="text-primary-600 hover:text-primary-700">
                      By {dish.chef}
                    </Link>
                  </div>
                  <div className="text-secondary-600 font-bold">
                    {formatPrice(dish.price)}
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400 text-sm">•</span>
                  <span className="text-gray-600 text-sm">{dish.reviews} reviews</span>
                  <span className="mx-2 text-gray-400 text-sm">•</span>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {dish.preparationTime} min
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded">
                    {dish.category}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Link to={`/dish/${dish.id}`}>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </Link>
                    <Button size="sm" rightIcon={<Plus className="h-4 w-4" />}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/menu">
            <Button size="lg">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;