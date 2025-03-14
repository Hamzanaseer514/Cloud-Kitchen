import { Search, Filter, MoreVertical } from 'lucide-react';

export function Orders() {
  const orders = [
    {
      id: '1234',
      table: 'Table 15',
      items: ['Grilled Salmon', 'Caesar Salad', 'Tiramisu'],
      status: 'In Progress',
      time: '10 mins ago',
    },
    {
      id: '1235',
      table: 'Table 8',
      items: ['Beef Burger', 'French Fries', 'Milkshake'],
      status: 'Ready',
      time: '15 mins ago',
    },
    {
      id: '1236',
      table: 'Table 23',
      items: ['Pasta Carbonara', 'Garlic Bread', 'Wine'],
      status: 'New',
      time: '2 mins ago',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            New Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-6 gap-4 p-4 border-b text-sm font-medium text-gray-500">
          <div className="col-span-2">Order Details</div>
          <div>Items</div>
          <div>Status</div>
          <div>Time</div>
          <div>Actions</div>
        </div>
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-6 gap-4 p-4 border-b items-center hover:bg-gray-50">
            <div className="col-span-2">
              <p className="font-medium text-gray-800">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.table}</p>
            </div>
            <div className="text-sm text-gray-600">{order.items.length} items</div>
            <div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'In Progress' ? 'bg-orange-100 text-orange-600' :
                order.status === 'Ready' ? 'bg-green-100 text-green-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">{order.time}</div>
            <div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}