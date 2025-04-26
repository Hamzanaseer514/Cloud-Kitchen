import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2';
// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Sample data for analytics
const analyticsData = {
  orders: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Users',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#4F46E5',
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
    }]
  },
  revenue: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [4500, 4200, 4800, 4600, 4100, 4000, 3800],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderRadius: 8,
    }]
  }
};

function AdminDashboard() {
  const stats = [
    { label: 'Active Kitchen', value: '50', change: '+12%', trend: 'up' },
    { label: 'Total Number of Users', value: '520', change: '-8%', trend: 'down' },
    { label: 'Riders', value: '25', change: '+4%', trend: 'up' },
    { label: 'Active Kitchen', value: '38', change: '-2%', trend: 'down' },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Analytics Info */}
      <div className="container mx-auto px-6 py-4">
        <p className="text-lg font-semibold text-gray-700">Analytics data is from last week. It updates every week.</p>
      </div>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div 
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:-translate-y-1"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change} {stat.trend === 'up' ? '↑' : '↓'}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Analytics Section */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Number of Users</h2>
          <div className="h-64">
            <Line data={analyticsData.orders} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Analysis</h2>
          <div className="h-64">
            <Bar data={analyticsData.revenue} options={chartOptions} />
          </div>
        </div>
      </section>
    </div>
  );
}
export default AdminDashboard;