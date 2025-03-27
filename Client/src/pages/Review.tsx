import React, { useState } from 'react';
import { Star, ThumbsUp, Clock, User, ChefHat, Camera, MessageCircle, Award } from 'lucide-react';

interface ReviewType {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
  verified?: boolean;
  category?: string;
}

export default function Review() {
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The kitchen renovation exceeded my expectations! The modern appliances and elegant design have transformed my cooking experience. The attention to detail in the cabinet finish and the innovative storage solutions make cooking and organizing a breeze. The quartz countertops are not only beautiful but incredibly practical.",
      date: "2024-03-10",
      helpful: 12,
      verified: true,
      category: "Complete Kitchen Renovation",
      images: [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      comment: "Great kitchen design with excellent storage solutions. The only minor issue was the delayed delivery of some cabinet handles. The workspace layout is perfect for meal prep, and the lighting design creates the perfect ambiance for both cooking and entertaining.",
      date: "2024-03-08",
      helpful: 8,
      verified: true,
      category: "Kitchen Design",
      images: [
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=800"
      ]
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    category: 'Kitchen Design',
    images: [] as string[]
  });

  const [filter, setFilter] = useState({
    rating: 0,
    category: 'all'
  });

  const categories = [
    "Kitchen Design",
    "Complete Kitchen Renovation",
    "Appliance Installation",
    "Cabinet Refacing",
    "Countertop Installation"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: ReviewType = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '', category: 'Kitchen Design', images: [] });
  };

  const handleHelpful = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, helpful: review.helpful + 1 } : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filter.rating > 0 && review.rating !== filter.rating) return false;
    if (filter.category !== 'all' && review.category !== filter.category) return false;
    return true;
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{reviews.length}</div>
            <div className="mt-2">
              <MessageCircle className="w-6 h-6 mx-auto text-blue-600" />
            </div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">
              {reviews.filter(r => r.verified).length}
            </div>
            <div className="mt-2">
              <Award className="w-6 h-6 mx-auto text-blue-600" />
            </div>
            <div className="text-gray-600">Verified Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">
              {reviews.reduce((acc, r) => acc + (r.images?.length || 0), 0)}
            </div>
            <div className="mt-2">
              <Camera className="w-6 h-6 mx-auto text-blue-600" />
            </div>
            <div className="text-gray-600">Photos Shared</div>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <ChefHat className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold">Share Your Kitchen Experience</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newReview.category}
                onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Submit Review</span>
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Rating
            </label>
            <select
              value={filter.rating}
              onChange={(e) => setFilter({ ...filter, rating: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Ratings</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews ({filteredReviews.length})</h2>
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.name}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.category}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{review.date}</span>
              </div>
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-200 group"
              >
                <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{review.helpful} found this helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}