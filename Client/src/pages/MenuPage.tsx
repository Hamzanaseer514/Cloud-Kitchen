import React, { useState, useEffect } from 'react';
import { ShoppingBag, Filter, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

// Import menu items data
const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Desserts', 'Drinks'];

const menuItems = [
  {
    id: 1,
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Burgers',
    popular: true
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Pizza',
    popular: false
  },
  {
    id: 3,
    name: 'Fettuccine Alfredo',
    description: 'Creamy pasta with parmesan cheese and garlic butter sauce',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1693609929945-b01ae4f2d602?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmV0dHVjY2luZSUyMEFsZnJlZG98ZW58MHx8MHx8fDA%3D',
    category: 'Pasta',
    popular: true
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'Desserts',
    popular: false
  },
  {
    id: 5,
    name: 'BBQ Bacon Burger',
    description: 'Beef patty with crispy bacon, cheddar cheese, and tangy BBQ sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80',
    category: 'Burgers',
    popular: true
  },
  {
    id: 6,
    name: 'Pepperoni Pizza',
    description: 'Classic pizza topped with pepperoni slices and mozzarella cheese',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    category: 'Pizza',
    popular: false
  },
  {
    id: 7,
    name: 'Strawberry Milkshake',
    description: 'Creamy milkshake made with fresh strawberries and vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    category: 'Drinks',
    popular: true
  },
  {
    id: 8,
    name: 'Spaghetti Bolognese',
    description: 'Spaghetti pasta with rich meat sauce and parmesan cheese',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'Pasta',
    popular: false
  },
  {
    id: 9,
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D',
    category: 'Salads',
    popular: true
  },
  {
    id: 10,
    name: 'Chicken Wings',
    description: 'Crispy fried chicken wings tossed in spicy buffalo sauce',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2hpY2tlbiUyMFdpbmdzfGVufDB8fDB8fHww',
    category: 'Appetizers',
    popular: true
  }
];


const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
//   const { addItem } = useCart();

  // Filter items based on category and search query
  useEffect(() => {
    let filtered = menuItems;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery]);

  // Handle adding item to cart
  const handleAddToCart = (item: any) => {
    // addItem({
    //   id: item.id,
    //   name: item.name,
    //   price: item.price,
    //   image: item.image,
    //   category: item.category
    // });
  };

  return (
    <div className="min-h-screen bg-white-50 dark:bg-white-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 dark:text-orange mb-4">Our Menu</h1>
          <p className="text-white-600 dark:text-white-300 max-w-2xl mx-auto">
            Explore our diverse selection of gourmet dishes prepared by our expert chefs using only the freshest ingredients.
          </p>
        </div>
        
        {/* Search and filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white-400" />
              </div>
              <input
                type="text"
                placeholder="Search our menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-white-300 dark:border-orange-400 rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-white-800 text-white-900 dark:text-white"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white-800 border border-white-300 dark:border-orange-400 rounded-lg text-white-700 dark:text-white-200 hover:bg-white-50 dark:hover:bg-white-700 transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
          
          {/* Category filters */}
          <motion.div 
            className="mt-4 overflow-hidden"
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4">
              <h3 className="text-lg font-medium text-white-800 dark:text-white mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-white-800 text-white-700 dark:text-white-200 hover:bg-white-100 dark:hover:bg-white-700 border border-white-300 dark:border-white-600'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Menu items grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-white-800 rounded-xl overflow-hidden shadow-lg border border-white-100 dark:border-white-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                  {item.popular && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white-800 dark:text-white">{item.name}</h3>
                    <span className="text-orange-500 font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-white-600 dark:text-white-300 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium px-2 py-1 bg-white-100 dark:bg-white-700 text-white-600 dark:text-white-300 rounded-full">
                      {item.category}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-white-800 dark:bg-white-700 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-black-200 py-2 px-4 rounded-lg transition-colors duration-300 flex items-center border border-gray-400 hover:border-none"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white-600 dark:text-white-400 text-lg">No items found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;