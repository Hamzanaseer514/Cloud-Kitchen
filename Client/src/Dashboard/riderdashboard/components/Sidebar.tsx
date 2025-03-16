import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, Users, Settings, Menu, X,Handshake,CookingPot,Bike,HistoryIcon,DollarSign } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/rider-dashboard' },
    { icon: HistoryIcon, label: 'Order History', path: '/rider-dashboard/order-history' },
    { icon: DollarSign, label: 'Earning', path: '/rider-dashboard/earning' },
    { icon: Settings, label: 'Settings', path: '/rider-dashboard/settings' },
    

  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30
          ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className={`font-bold text-xl ${!isOpen && 'hidden'}`}>Kitchen Admin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-orange-100 text-orange-500 lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors
                ${currentPath === item.path ? 'bg-orange-50 text-orange-500 border-r-4 border-orange-500' : ''}
                ${!isOpen && 'justify-center'}
              `}
              onClick={() => window.innerWidth < 1024 && toggleSidebar()}
            >
              <item.icon size={20} />
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${!isOpen && 'hidden'}`}>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
              alt="Chef profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">Gordon Smith</p>
              <p className="text-sm text-gray-500">Rider</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}