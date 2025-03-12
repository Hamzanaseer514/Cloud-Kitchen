import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Button from '../ui/Button';

// Mock data for featured chefs
const FEATURED_CHEFS = [
  {
    id: '1',
    name: 'Maria Johnson',
    image: 'https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'Italian Cuisine',
    rating: 4.8,
    reviews: 124,
    bio: 'Passionate about authentic Italian recipes passed down through generations.',
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1577&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'Indian & Middle Eastern',
    rating: 4.9,
    reviews: 89,
    bio: 'Specializing in aromatic spices and traditional cooking techniques.',
  },
  {
    id: '3',
    name: 'Amara yousaf',
    image: 'https://images.unsplash.com/photo-1659354219028-cae11db067c4?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'Asian Fusion',
    rating: 4.7,
    reviews: 156,
    bio: 'Creating innovative dishes that blend traditional Asian flavors with modern techniques.',
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1659354219145-dedd2324698e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialty: 'Latin American',
    rating: 4.6,
    reviews: 78,
    bio: 'Bringing the vibrant flavors of Latin America to your table with love.',
  },
];

const FeaturedChefs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Meet Our Featured Chefs
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Talented home chefs bringing their passion and unique flavors to your doorstep
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_CHEFS.map((chef) => (
            <div key={chef.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-64 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{chef.name}</h3>
                <p className="text-orange-600 font-medium">{chef.specialty}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{chef.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{chef.reviews} reviews</span>
                </div>
                
                <p className="mt-3 text-gray-600 line-clamp-2">{chef.bio}</p>
                
                <div className="mt-4">
                  <Link to={`/chef/${chef.id}`}>
                    <Button variant="outline" fullWidth>
                      View Menu
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/chefs">
            <Button size="lg">
              View All Chefs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefs;