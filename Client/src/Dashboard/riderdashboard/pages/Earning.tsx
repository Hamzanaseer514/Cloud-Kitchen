// First, let's analyze what we need:
// 1. A rider earnings dashboard component
// 2. Must show PKR currency
// 3. Must be TypeScript-based
// 4. Must use orange and white theme
// 5. Must be responsive
// 6. Must show earnings analytics
// 7. Must be clean and maintainable
// 
// Let's start with our imports and types:

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Now let's define our TypeScript interfaces for the data structure. We'll add more details about trips and earnings:

interface TripDetails {
  id: number
  date: string
  distance: number
  baseFare: number
  serviceCharge: number
  total: number
  status: 'completed' | 'cancelled'
}

interface EarningsData {
  total: number
  completedTrips: number
  averageRating: number
  tripDetails: TripDetails[]
}

interface TimePeriodData extends EarningsData {
  daily: number[]
  weekly: number[]
  monthly: number[]
}

// Let's create our mock data with realistic values in PKR:

const DEFAULT_EARNINGS_DATA: TimePeriodData = {
  total: 150000,
  completedTrips: 75,
  averageRating: 4.8,
  tripDetails: [
    { id: 1, date: '2025-03-16', distance: 5, baseFare: 20000, serviceCharge: 3000, total: 23000, status: 'completed' },
    { id: 2, date: '2025-03-15', distance: 3, baseFare: 12000, serviceCharge: 2000, total: 14000, status: 'completed' },
    { id: 3, date: '2025-03-14', distance: 4, baseFare: 16000, serviceCharge: 2500, total: 18500, status: 'completed' }
  ],
  daily: [10000, 12000, 11000, 13000, 14000, 16000, 17000],
  weekly: [80000, 90000, 95000, 100000],
  monthly: [300000, 350000, 400000]
}

// Now let's create our component with proper TypeScript props interface:

interface EarningProps {
  data?: TimePeriodData
}

// Let's create our main component with proper styling using Tailwind classes:

const Earning = ({ data = DEFAULT_EARNINGS_DATA }: EarningProps) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  
// Let's create helper functions for formatting and calculations:

  const formatChartData = (values: number[], label: string): Array<{ date: string; earnings: number }> => {
    return values.map((value, index) => ({
      date: `${label} ${index + 1}`,
      earnings: value
    }))
  }

  const formatPKR = (amount: number): string => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount)
  }

  const calculateAverageEarnings = (values: number[]): number => {
    return values.reduce((a, b) => a + b, 0) / values.length
  }

  
// Now let's create our JSX structure with more detailed content:

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">Rider Earnings</h2>
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="text-sm text-orange-500 mb-2">Total Earnings</div>
            <div className="text-xl font-bold">{formatPKR(data.total)}</div>
          </div>

          <div className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-sm text-gray-500 mb-2">Completed Trips</div>
            <div className="text-xl font-bold">{data.completedTrips}</div>
          </div>

          <div className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-sm text-gray-500 mb-2">Average Rating</div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-bold bg-orange-100 text-orange-800 rounded-full">
                {data.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Earnings Timeline */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'daily'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'weekly'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'monthly'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formatChartData(data[activeTab], activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => formatPKR(value)} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  dot={{ fill: '#FF6B35' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Trips Section */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Recent Trips</h3>
          <div className="space-y-2">
            {data.tripDetails.map(trip => (
              <div key={trip.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Trip #{trip.id}</div>
                  <div className="text-sm text-gray-500">{trip.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Distance: {trip.distance}km</div>
                  <div className="text-sm text-gray-500">Base Fare: {formatPKR(trip.baseFare)}</div>
                  <div className="text-sm text-gray-500">Service Charge: {formatPKR(trip.serviceCharge)}</div>
                  <div className="font-bold">{formatPKR(trip.total)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Earnings Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-500 mb-2">Average Daily Earnings</div>
              <div className="text-xl font-bold">{formatPKR(calculateAverageEarnings(data.daily))}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-500 mb-2">Average Weekly Earnings</div>
              <div className="text-xl font-bold">{formatPKR(calculateAverageEarnings(data.weekly))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Earning