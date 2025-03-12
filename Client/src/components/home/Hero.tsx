import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          alt="Homemade food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            Homemade Food, <br />
            <span className="text-orange-400">Delivered</span> With Love
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl">
            Discover authentic home-cooked meals made by passionate home chefs in your neighborhood. Fresh, delicious, and delivered to your doorstep.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="flex-1 sm:flex-none">
              <Button size="lg" fullWidth className="sm:w-auto">
                Explore Menu
              </Button>
            </Link>
            <Link to="/chefs" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" fullWidth className="sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20">
                Meet Our Chefs
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 bg-white rounded-lg shadow-xl p-2 max-w-2xl">
            <div className="flex items-center">
              <div className="pl-4 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for dishes or cuisines..."
                className="w-full py-3 px-4 focus:outline-none text-gray-700"
              />
              <div className="pr-2">
                <Button>Search</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center text-gray-300 text-sm">
            <span className="font-medium mr-2">Popular:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Biryani</span>
              <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Pasta</span>
              <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Curry</span>
              <span className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer">Desserts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;