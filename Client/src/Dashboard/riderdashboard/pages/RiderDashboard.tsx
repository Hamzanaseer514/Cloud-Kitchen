// First, let's analyze what we need:
// 1. A rider dashboard component showing performance metrics
// 2. Must use TypeScript for type safety
// 3. Must use Tailwind CSS for styling
// 4. Must be responsive
// 5. Must show orders, profit, and income data
// 6. Must include a line chart visualization
// 7. Must fix the "All Metrics" tab issue
// 
// Let's start with our imports and types:

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FaShoppingCart, FaMoneyBillWave, FaBox } from 'react-icons/fa'

// Now let's define our TypeScript interfaces for the data structure:

interface PerformanceData {
  month: string
  orders: number
  profit: number
  income: number
}

// Let's create our mock data with realistic values:

const DEFAULT_PERFORMANCE_DATA: PerformanceData[] = [
  { month: "Jan", orders: 400, profit: 2400, income: 3000 },
  { month: "Feb", orders: 300, profit: 2210, income: 2800 },
  { month: "Mar", orders: 500, profit: 2290, income: 3200 },
  { month: "Apr", orders: 450, profit: 2000, income: 3100 },
  { month: "May", orders: 600, profit: 2500, income: 3500 },
]

// Now let's create our component with proper TypeScript props interface:

interface RiderDashboardProps {
  data?: PerformanceData[]
}

// Let's create our main component with proper styling using Tailwind classes:

const RiderDashboard = ({ data = DEFAULT_PERFORMANCE_DATA }: RiderDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'profit' | 'income'>('all')

  
// Let's create helper functions for calculations and formatting:

  const calculateTotal = (key: keyof PerformanceData): number => {
    return data.reduce((sum, item) => {
      const value = item[key]
      return sum + (typeof value === 'number' ? value : 0)
    }, 0)
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num)
  }

  
// Now let's create our JSX structure with enhanced styling and animations:

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Rider Performance Dashboard</h1>
        <p className="text-gray-600">Track your performance and optimize your delivery strategy</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <FaShoppingCart size={30} className="text-orange-500 animate-bounce" />
            <div>
              <h2 className="text-lg font-bold text-gray-700">Total Orders</h2>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(calculateTotal('orders'))}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <FaMoneyBillWave size={30} className="text-green-500 animate-pulse" />
            <div>
              <h2 className="text-lg font-bold text-gray-700">Total Profit</h2>
              <p className="text-2xl font-bold text-gray-900">PKR {formatNumber(calculateTotal('profit'))}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <FaBox size={30} className="text-blue-500 animate-bounce" />
            <div>
              <h2 className="text-lg font-bold text-gray-700">Total Income</h2>
              <p className="text-2xl font-bold text-gray-900">PKR {formatNumber(calculateTotal('income'))}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Metrics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('profit')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'profit'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Profit
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'income'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
                labelStyle={{ color: '#666' }}
                formatter={(value: number) => formatNumber(value)}
              />
              {/* Always show all metrics when 'all' tab is active */}
              {activeTab === 'all' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ fill: '#ff7300' }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#ffa500"
                    strokeWidth={2}
                    dot={{ fill: '#ffa500' }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#ff4500"
                    strokeWidth={2}
                    dot={{ fill: '#ff4500' }}
                    activeDot={{ r: 8 }}
                  />
                </>
              )}
              {/* Show only selected metric when not on 'all' tab */}
              {activeTab !== 'all' && (
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={{ fill: '#ff7300' }}
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RiderDashboard