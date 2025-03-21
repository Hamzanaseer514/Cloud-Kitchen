import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Chatbot from './components/home/Chatbot';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ChefRegisterPage from './pages/ChefRegisterPage.jsx';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { KitchenProvider } from './context/KitchenContext.jsx';
import ChefDashboardLayout from './Dashboard/chefdashboard/layout/ChefDashboardLayout';
import { Dashboard } from './Dashboard/chefdashboard/pages/Dashboard';
import { Orders } from './Dashboard/chefdashboard/pages/Orders';
import { Settings } from './Dashboard/chefdashboard/pages/Settings';
import Premium from './Dashboard/chefdashboard/pages/Premium';
import CustomizeOrder from './Dashboard/chefdashboard/pages/CustomizeOrder';
import DeliveryPartners from './Dashboard/chefdashboard/pages/DeliveryPartners';
import MenuUpload from './Dashboard/chefdashboard/pages/MenuUpload';
import AdminDashboardLayout from './Dashboard/admindashboard/layout/AdminDashboardLayout';
import KitchenApproval from './Dashboard/admindashboard/pages/KitchenApproval.jsx';
// import DeliveryPartnerApproval from './Dashboard/admindashboard/pages/DeliveryPartnersApproval';
import Users from './Dashboard/admindashboard/pages/Users';
import { AdminSettings } from './Dashboard/admindashboard/pages/AdminSettings';
import AdminDashboard from './Dashboard/admindashboard/pages/AdminDashboard';
import AddRider from './Dashboard/admindashboard/pages/AddRider';
import ProtectedRoute from './components/auth/ProtectedRoute.js';
import UnauthorizedPage from './components/auth/UnauthorizedPage.jsx';
import KitchenMenu from './pages/KitchenMenu.jsx';

import Earning from './Dashboard/riderdashboard/pages/Earning';
import OrderHistory from './Dashboard/riderdashboard/pages/OrderHistory';
import RiderSettings from './Dashboard/riderdashboard/pages/RiderSettings';
import RiderDashboard from './Dashboard/riderdashboard/pages/RiderDashboard';
import RiderDashboardLayout from './Dashboard/riderdashboard/layout/RiderDashboardLayout';
import CustomizeFood from './pages/CustomizeFood.js';
import CartPage from './pages/CartPage.js';




// Handles Layout and Conditional Rendering
const AppContent: React.FC = () => {
  const location = useLocation();
  const hideChatbotRoutes: string[] = [
    "/chef-register", "/login", "/register",
    "/chef-dashboard", "/chef-dashboard/orders",
    "/chef-dashboard/schedule", "/chef-dashboard/team",
    "/chef-dashboard/settings",
    "/chef-dashboard/premium",
    "/chef-dashboard/customizeorder",
    "/chef-dashboard/menuupload",
    "/chef-dashboard/deliverypartners",
    "/admin-dashboard",
    "/admin-dashboard/kitchen-approval",
    "/admin-dashboard/deliverypartner-approval",
    "/admin-dashboard/users",
    "/admin-dashboard/settings",
    "/admin-dashboard/add-rider"

  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Hide Navbar for Dashboard Pages */}
      {/* {!location.pathname.startsWith("/chef-dashboard") && !location.pathname.startsWith("/admin-dashboard") && <Navbar />} */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chef-register" element={<ChefRegisterPage />} />
          <Route element={<ProtectedRoute requiredRole="customer" />}>
            <Route path="/kitchen/:id" element={<KitchenMenu />} />
          </Route>
          <Route path='/kitchen/:id/customize-food' element={<CustomizeFood/>}/>
          <Route path='/cart' element={<CartPage/>}/>



          {/* chefdashboard Routes */}
          <Route element={<ProtectedRoute requiredRole={"chef"} />}>
            <Route path="/chef-dashboard/*" element={<ChefDashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customizeorder" element={<CustomizeOrder />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="premium" element={<Premium />} />
              <Route path="menuupload" element={<MenuUpload />} />
              <Route path="deliverypartners" element={<DeliveryPartners />} />
            </Route>
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />


          {/* Admin Dashboard Routes */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/admin-dashboard/*" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="kitchen-approval" element={<KitchenApproval />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="add-rider" element={<AddRider />} />
            </Route>
          </Route>

          {/* Rider Dashboard Routes */}
          <Route element={<ProtectedRoute requiredRole="rider" />}>
            <Route path="/rider-dashboard/*" element={<RiderDashboardLayout />}>
              <Route index element={<RiderDashboard />} />
              <Route path="earning" element={<Earning />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="settings" element={<RiderSettings />} />
            </Route>
          </Route>
        </Routes>

      </main>

      {/* Hide Footer for Dashboard Pages */}
      {!location.pathname.startsWith("/chef-dashboard") && !location.pathname.startsWith("/admin-dashboard") && !location.pathname.startsWith("/rider-dashboard") && <Footer />}

      {/* Chatbot - Only Show on Specific Routes */}
      {!hideChatbotRoutes.includes(location.pathname) && (
        <div className="fixed bottom-4 right-4 z-50">
          <Chatbot />
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

// Main App
const App: React.FC = () => {
  return (
    <KitchenProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </KitchenProvider>
  );
};

export default App;