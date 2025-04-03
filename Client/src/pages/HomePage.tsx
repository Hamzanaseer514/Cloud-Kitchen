import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedChefs from '../components/home/FeaturedChefs';
// import PopularDishes from '../components/home/PopularDishes';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import PopularKitchens from '../components/home/PopularKitchens';
import CustomerPremium from '../components/home/CustomerPremium';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      {/* <PopularDishes /> */}
      <PopularKitchens/>
      <HowItWorks />
      <FeaturedChefs />
      <CustomerPremium/>
      <Testimonials />
    </div>
  );
};

export default HomePage;