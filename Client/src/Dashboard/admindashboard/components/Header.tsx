import { Bell, Menu, Search } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-orange-50 text-gray-600">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="font-medium text-gray-800">Gordon Smith</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
              alt="Chef profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}