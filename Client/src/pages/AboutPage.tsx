import { FaUsers, FaLightbulb, FaStar, FaUtensils, FaHandshake, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import pic1 from "../assets/1.jpg"

const About = () => {
  // Founder data
  const founders = [
    {
      name: "Syed Zain",
      role: "Full Stack Developer",
      image: "/founders/zain.jpg", // Add actual image path
      linkedin: "https://linkedin.com/in/syedzain"
    },
    {
      name: "Syed Saad",
      role: "Backend Developer",
      image: "/founders/saad.jpg", // Add actual image path
      linkedin: "https://linkedin.com/in/syedsaad"
    },
    {
      name: "Syed Anas",
      role: "Frontend Developer",
      image: "/founders/anas.jpg", // Add actual image path
      linkedin: "https://linkedin.com/in/syedanas"
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing Home-Cooked Food Delivery
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Cloud Kitchen connects passionate home chefs with food lovers, creating a community
              where authentic, home-cooked meals meet innovative delivery solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-100">
            <FaUtensils className="text-orange-500 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower home chefs and deliver authentic, home-cooked meals while creating
              economic opportunities in local communities. We strive to make quality food
              accessible to everyone while supporting local culinary talent.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-orange-100">
            <FaLightbulb className="text-orange-500 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the world's leading platform for home-based culinary entrepreneurs,
              fostering a sustainable ecosystem where passion for cooking meets technology
              and innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-orange-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Cloud Kitchen?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <FaUsers className="text-orange-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Chefs</h3>
              <p className="text-gray-600">
                All our chefs undergo rigorous verification and quality checks to ensure
                the highest standards of food safety and quality.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <FaStar className="text-orange-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Regular quality audits and customer feedback ensure consistent
                excellence in every meal delivered.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <FaMapMarkerAlt className="text-orange-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Coverage</h3>
              <p className="text-gray-600">
                Extensive network of chefs across the city ensures quick delivery
                and fresh food right at your doorstep.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Meet Our Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={pic1}
                  alt={founder.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Founder+Image';
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-orange-500 mb-4">{founder.role}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-orange-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a passionate chef looking to share your culinary creations
            or a food lover seeking authentic home-cooked meals, we'd love to hear from you.
          </p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
