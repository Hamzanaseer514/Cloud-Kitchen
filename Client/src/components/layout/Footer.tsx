import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-400" />
              <span className="ml-2 text-xl font-display font-bold text-white">Cloud Kitchen</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Connecting home chefs with food lovers. Enjoy authentic, homemade meals delivered to your doorstep.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-400">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-orange-400">Menu</Link>
              </li>
              <li>
                <Link to="/chefs" className="text-gray-400 hover:text-orange-400">Our Chefs</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-400">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Join Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=chef" className="text-gray-400 hover:text-orange-400">Become a Chef</Link>
              </li>
              <li>
                <Link to="/register?role=rider" className="text-gray-400 hover:text-orange-400">Join as Delivery Partner</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-orange-400">Careers</Link>
              </li>
              <li>
                <Link to="/partner" className="text-gray-400 hover:text-orange-400">Partner With Us</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>123 Food Street</p>
              <p>Culinary City, CC 12345</p>
              <p className="mt-3">Email: info@cloudkitchen.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Cloud Kitchen. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:text-orange-400">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-orange-400">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;