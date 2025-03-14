export function Dashboard() {
  const stats = [
    { label: 'Active Orders', value: '24' },
    { label: 'Completed Today', value: '156' },
    { label: 'Team Members', value: '12' },
    { label: 'Average Rating', value: '4.8' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">Order #{order}234</p>
                  <p className="text-sm text-gray-500">Table 12 • 3 items</p>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', task: 'Morning Prep' },
              { time: '11:30 AM', task: 'Lunch Service' },
              { time: '03:00 PM', task: 'Inventory Check' },
            ].map((schedule, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-24 text-sm font-medium text-gray-600">{schedule.time}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{schedule.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}