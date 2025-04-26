import API_BASE_URL from "../../../utils/config";
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-2'; // <-- Pie ko Doughnut se replace kiya!

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Sample plans data
const plans = [
  {
    displayName: "Weekly",     // what user sees
    internalName: "Basic",     // what backend/Stripe sees
    price: 1000,
    duration: "Per Week",
    features: ["10 Menus Can be Uploaded", "Priority Support"],
  },
  {
    displayName: "Monthly",
    internalName: "Advance",
    price: 1750,
    duration: "Per Month",
    features: ["All Basic Benefits", "AI Chatbot Support",  "30 Menus can Be uploaded"],
  },
  {
    displayName: "Yearly",
    internalName: "Pro",
    price: 5999,
    duration: "Per Year",
    features: ["All Advance Benefits", "Special Offers", "Unlimited Menus Can Be Uploaded"],
  },
];

const analyticsData = {
  orders: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Orders',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
          '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#FACC15',
      ],
      hoverOffset: 10,
    }]
  },
  revenue: {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 500}-${(i + 1) * 500}`),
    datasets: [{
      label: 'Revenue Distribution',
      data: [2, 5, 9, 15, 10, 8, 5, 3, 1, 0],
      backgroundColor: '#FB923C',
      borderRadius: 8,
    }]
  }
};

export function Dashboard() {
  const [Premium, setPremium] = useState(null); // Premium status

  const stats = [
    { label: 'Active Orders', value: '24', change: '+12%', trend: 'up' },
    { label: 'Completed Today', value: '156', change: '-8%', trend: 'down' },
    { label: 'Team Members', value: '12', change: '+4%', trend: 'up' },
    { label: 'Average Rating', value: '4.8', change: '-2%', trend: 'down' },
  ];

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    cutout: '60%', 
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Revenue Histogram',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Revenue Range ($)',
        },
        grid: { display: false },
      },
      y: {
        title: { display: true, text: 'Number of Transactions' },
        beginAtZero: true,
        grid: { display: false },
      },
    },
  };

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/check-premium`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        console.log("Received data:", data);

        if (data.isPremium) {
          setPremium(data); // Set premium data
        } else {
          setPremium(null);
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
      }
    };

    checkPremiumStatus();
  }, []);

  // Map plan features dynamically based on the plan the user has
  const currentPlanFeatures = plans.find(plan => plan.internalName === Premium?.plan);

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
          <h2 className="text-xl font-semibold mb-4">Orders Distribution</h2>
          <div className="h-64">
            <Doughnut data={analyticsData.orders} options={donutOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Histogram</h2>
          <div className="h-64">
            <Bar data={analyticsData.revenue} options={barOptions} />
          </div>
        </div>
      </section>

        {/* Subscription Info */}
<section className="container mx-auto px-6 py-8">
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Subscription</h2>
    
    <div className="mb-6 space-y-2">
      <p className="text-xl font-semibold text-indigo-600">
        {Premium ? Premium.plan : "Loading..."}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
        <span>Start: {Premium ? Premium.startdate : "Loading..."}</span>
        <span>End: {Premium ? Premium.enddate : "Loading..."}</span>
        <span>Price: {Premium ? Premium.price : "Loading..."}</span>
        <span>Remaining: {Premium ? `${Premium.menusLeft} menus` : "Loading..."}</span>
      </div>
    </div>

    {/* Plan Features */}
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Plan Benefits:</h3>
      {currentPlanFeatures ? (
        <ul className="space-y-2 text-gray-700 list-disc pl-5">
          {currentPlanFeatures.features.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      ) : (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      )}
    </div>

  </div>
</section>
    </div>
  );
}
