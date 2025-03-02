import React from 'react';
import { Search, ChefHat, Truck, ThumbsUp } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Browse & Select',
    description: 'Explore our diverse menu of homemade dishes from talented home chefs in your area.',
    icon: <Search className="h-10 w-10 text-primary-500" />,
  },
  {
    id: 2,
    title: 'Chef Prepares',
    description: 'Your selected home chef freshly prepares your meal with love and care.',
    icon: <ChefHat className="h-10 w-10 text-primary-500" />,
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Our delivery partners bring your delicious meal straight to your doorstep.',
    icon: <Truck className="h-10 w-10 text-primary-500" />,
  },
  {
    id: 4,
    title: 'Enjoy & Rate',
    description: 'Savor your homemade meal and share your experience by rating the chef.',
    icon: <ThumbsUp className="h-10 w-10 text-primary-500" />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            How Cloud Kitchen Works
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to enjoy delicious homemade food
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg shadow-md p-8 text-center relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary-100 rounded-full p-4 inline-flex items-center justify-center">
                {step.icon}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {step.id}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                Become a Home Chef
              </h3>
              <p className="text-gray-600 mb-6">
                Are you passionate about cooking? Share your culinary skills and earn money by becoming a home chef on our platform. It's easy to get started!
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-600 text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Register and complete your chef profile</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-600 text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600">Create your menu with your signature dishes</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-600 text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Receive orders and start cooking</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <span className="text-primary-600 text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-600">Earn money and build your reputation</p>
                </li>
              </ul>
              <a href="/register?role=chef" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                Learn more about becoming a chef
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Home chef cooking"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;