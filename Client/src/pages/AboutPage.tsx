
import { FaUsers, FaLightbulb, FaStar, FaUtensils, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Main Card */}
      <div className="bg-gray-800 bg-opacity-80 p-8 sm:p-10 rounded-2xl shadow-lg max-w-4xl text-center backdrop-blur-md w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 text-transparent bg-clip-text mb-6">
          About Us
        </h1>
        <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-6">
          We are a passionate team dedicated to delivering top-notch solutions.
          Our goal is to innovate, create, and push the boundaries of what's
          possible.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 max-w-6xl w-full">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <FaUsers className="text-orange-400 text-5xl mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-white">Our Team</h2>
          <p className="text-gray-400 text-center mt-2 text-sm sm:text-md">
            A dedicated team of experts working together to bring your ideas to life.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <FaLightbulb className="text-yellow-400 text-5xl mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-white">Innovation</h2>
          <p className="text-gray-400 text-center mt-2 text-sm sm:text-md">
            Always pushing boundaries and bringing fresh, creative ideas.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <FaStar className="text-red-400 text-5xl mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-white">Excellence</h2>
          <p className="text-gray-400 text-center mt-2 text-sm sm:text-md">
            Committed to delivering top-tier quality in everything we do.
          </p>
        </div>
      </div>

      {/* Our Passion & Mission Section */}
      <div className="mt-16 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <FaUtensils className="text-orange-400 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-white">Our Passion</h2>
          <p className="text-gray-300 text-center mt-2 text-md">
            We believe in the art of home-cooked meals. Our platform empowers
            local chefs by giving them a space to share their talent.
          </p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <FaHandshake className="text-yellow-400 text-6xl mb-4" />
          <h2 className="text-xl font-semibold text-white">Our Mission</h2>
          <p className="text-gray-300 text-center mt-2 text-md">
            Our goal is to promote home-based chefs and provide people with
            high-quality, homemade food delivered straight to their doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
