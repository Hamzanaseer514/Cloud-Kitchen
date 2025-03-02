import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedChefs from '../components/home/FeaturedChefs';
import PopularDishes from '../components/home/PopularDishes';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularDishes />
      <HowItWorks />
      <FeaturedChefs />
      <Testimonials />
    </div>
  );
};

export default HomePage;