import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Thompson',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    quote: 'Cloud Kitchen has completely changed how I eat. The homemade meals are so much better than restaurant food - they taste like they were made with love and care. My favorites are the Indian dishes from Ahmed!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Food Enthusiast',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    quote: 'As someone who appreciates authentic cuisine, I\'ve been blown away by the quality and variety of food available. It\'s like having access to dozens of home kitchens, each with their own specialties.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Busy Professional',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    quote: 'With my hectic schedule, Cloud Kitchen has been a lifesaver. I can order healthy, homemade food that\'s ready when I need it. The app is easy to use, and the delivery is always prompt.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Home Chef',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    quote: 'Joining Cloud Kitchen as a chef has been rewarding both financially and personally. I love sharing my family recipes with others, and the platform makes it easy to manage orders and connect with customers.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            What Our Community Says
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our customers and chefs about their Cloud Kitchen experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-800 rounded-lg p-6 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary-500">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-8 text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2">
            <span className="text-4xl font-bold text-primary-400">4.8</span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-400">Average rating from 2,500+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;