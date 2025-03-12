
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Chatbot from './components/home/Chatbot';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ChefRegisterPage from './pages/ChefRegisterPage'
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
// import { div } from 'framer-motion/client';

function App() {
  return (
    
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen relative ">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/menu" element={<MenuPage />}/>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/chef-register" element={<ChefRegisterPage />} />
                
                
                {/* Add more routes as needed */}
              </Routes>
            </main>
            <Footer />
            {/* Chatbot with fixed positioning */}
            <div className="fixed bottom-4 right-4 z-50">
              <Chatbot />
            </div>
          </div>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
  
  
}

export default App;