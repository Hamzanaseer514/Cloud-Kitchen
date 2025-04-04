// import React, { useState } from 'react';
// import { Star, ThumbsUp, Clock, User, ChefHat, MessageCircle, Award, Search, Filter, Sparkles } from 'lucide-react';

// export default function Review() {
//     const [reviews, setReviews] = useState([
//         {
//             id: 1,
//             name: "Sarah Johnson",
//             rating: 5,
//             comment: "The kitchen renovation exceeded my expectations! The modern appliances and elegant design have transformed my cooking experience. The attention to detail in the cabinet finish and the innovative storage solutions make cooking and organizing a breeze. The quartz countertops are not only beautiful but incredibly practical.",
//             date: "2024-03-10",
//             helpful: 12,
//             verified: true,
//             category: "Complete Kitchen Renovation"
//         },
//         {
//             id: 2,
//             name: "Michael Chen",
//             rating: 4,
//             comment: "Great kitchen design with excellent storage solutions. The only minor issue was the delayed delivery of some cabinet handles. The workspace layout is perfect for meal prep, and the lighting design creates the perfect ambiance for both cooking and entertaining.",
//             date: "2024-03-08",
//             helpful: 8,
//             verified: true,
//             category: "Kitchen Design"
//         }
//     ]);

//     const [newReview, setNewReview] = useState({
//         name: '',
//         rating: 5,
//         comment: '',
//         category: 'Kitchen Design'
//     });

//     const [filter, setFilter] = useState({
//         rating: 0,
//         category: 'all'
//     });

//     const categories = [
//         "Kitchen Design",
//         "Complete Kitchen Renovation",
//         "Appliance Installation",
//         "Cabinet Refacing",
//         "Countertop Installation"
//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const review = {
//             id: reviews.length + 1,
//             ...newReview,
//             date: new Date().toISOString().split('T')[0],
//             helpful: 0,
//             verified: true
//         };
//         setReviews([review, ...reviews]);
//         setNewReview({ name: '', rating: 5, comment: '', category: 'Kitchen Design' });
//     };

//     const handleHelpful = (id) => {
//         setReviews(reviews.map(review =>
//             review.id === id ? { ...review, helpful: review.helpful + 1 } : review
//         ));
//     };

//     const filteredReviews = reviews.filter(review => {
//         if (filter.rating > 0 && review.rating !== filter.rating) return false;
//         if (filter.category !== 'all' && review.category !== filter.category) return false;
//         return true;
//     });

//     const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-12">
//             {/* Stats Overview */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -mr-32 -mt-32 opacity-20"></div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
//                     <div className="text-center transform hover:scale-105 transition-transform p-6 rounded-xl bg-gradient-to-br from-white to-orange-50">
//                         <div className="text-5xl font-bold text-orange-500 mb-2">{averageRating.toFixed(1)}</div>
//                         <div className="flex justify-center my-3">
//                             {[...Array(5)].map((_, i) => (
//                                 <Star
//                                     key={i}
//                                     className={`w-6 h-6 ${i < Math.round(averageRating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
//                                         }`}
//                                 />
//                             ))}
//                         </div>
//                         <div className="text-gray-600 font-medium">Average Rating</div>
//                     </div>
//                     <div className="text-center transform hover:scale-105 transition-transform p-6 rounded-xl bg-gradient-to-br from-white to-orange-50">
//                         <div className="text-5xl font-bold text-orange-500 mb-2">{reviews.length}</div>
//                         <div className="mt-3">
//                             <MessageCircle className="w-8 h-8 mx-auto text-orange-500" />
//                         </div>
//                         <div className="text-gray-600 font-medium">Total Reviews</div>
//                     </div>
//                     <div className="text-center transform hover:scale-105 transition-transform p-6 rounded-xl bg-gradient-to-br from-white to-orange-50">
//                         <div className="text-5xl font-bold text-orange-500 mb-2">
//                             {reviews.filter(r => r.verified).length}
//                         </div>
//                         <div className="mt-3">
//                             <Award className="w-8 h-8 mx-auto text-orange-500" />
//                         </div>
//                         <div className="text-gray-600 font-medium">Verified Reviews</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Add Review Form */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
//                 <div className="flex items-center mb-8">
//                     <ChefHat className="w-10 h-10 text-orange-500 mr-4" />
//                     <div>
//                         <h2 className="text-3xl font-bold text-gray-800">Share Your Experience</h2>
//                         <p className="text-gray-600 mt-1">Your feedback helps others make better decisions</p>
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                         <div className="space-y-2">
//                             <label className="block text-sm font-semibold text-gray-700">
//                                 Your Name
//                             </label>
//                             <input
//                                 type="text"
//                                 value={newReview.name}
//                                 onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-200"
//                                 required
//                                 placeholder="Enter your name"
//                             />
//                         </div>
//                         <div className="space-y-2">
//                             <label className="block text-sm font-semibold text-gray-700">
//                                 Category
//                             </label>
//                             <select
//                                 value={newReview.category}
//                                 onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-200"
//                             >
//                                 {categories.map((cat) => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                             Your Rating
//                         </label>
//                         <div className="flex items-center space-x-3">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                     key={star}
//                                     type="button"
//                                     onClick={() => setNewReview({ ...newReview, rating: star })}
//                                     className="focus:outline-none transform hover:scale-125 transition-transform duration-200"
//                                 >
//                                     <Star
//                                         className={`w-10 h-10 ${star <= newReview.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
//                                             }`}
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                             Your Review
//                         </label>
//                         <textarea
//                             value={newReview.comment}
//                             onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow duration-200"
//                             rows={4}
//                             required
//                             placeholder="Share your experience with our kitchen service..."
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                     >
//                         <Sparkles className="w-6 h-6" />
//                         <span className="text-lg font-semibold">Submit Your Review</span>
//                     </button>
//                 </form>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
//                 <div className="flex items-center mb-6">
//                     <Filter className="w-6 h-6 text-orange-500 mr-3" />
//                     <h3 className="text-xl font-semibold text-gray-800">Filter Reviews</h3>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                             Filter by Rating
//                         </label>
//                         <select
//                             value={filter.rating}
//                             onChange={(e) => setFilter({ ...filter, rating: Number(e.target.value) })}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
//                         >
//                             <option value={0}>All Ratings</option>
//                             {[5, 4, 3, 2, 1].map((rating) => (
//                                 <option key={rating} value={rating}>{rating} Stars</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="space-y-2">
//                         <label className="block text-sm font-semibold text-gray-700">
//                             Filter by Category
//                         </label>
//                         <select
//                             value={filter.category}
//                             onChange={(e) => setFilter({ ...filter, category: e.target.value })}
//                             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-200"
//                         >
//                             <option value="all">All Categories</option>
//                             {categories.map((category) => (
//                                 <option key={category} value={category}>{category}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* Reviews List */}
//             <div className="space-y-8">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-3xl font-bold text-gray-800 flex items-center">
//                         <MessageCircle className="w-8 h-8 mr-3 text-orange-500" />
//                         Customer Reviews
//                         <span className="ml-3 text-orange-500">({filteredReviews.length})</span>
//                     </h2>
//                 </div>
//                 <div className="grid grid-cols-1 gap-8">
//                     {filteredReviews.map((review) => (
//                         <div key={review.id} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300">

//                             {/* 🔹 Profile & Rating Row */}
//                             <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6">
//                                 <div className="flex items-center space-x-3 sm:space-x-4">
//                                     <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-2 sm:p-3">
//                                         <User className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
//                                     </div>
//                                     <div>
//                                         <div className="flex flex-wrap items-center space-x-2 sm:space-x-3">
//                                             <span className="text-lg sm:text-xl font-semibold text-gray-800">{review.name}</span>
//                                             {review.verified && (
//                                                 <span className="bg-green-100 text-green-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center">
//                                                     <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                                                     Verified
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <span className="text-orange-500 font-medium text-sm sm:text-base">{review.category}</span>
//                                     </div>
//                                 </div>

//                                 {/* ⭐ Responsive Stars */}
//                                 <div className="flex items-center space-x-1">
//                                     {[...Array(5)].map((_, index) => (
//                                         <Star
//                                             key={index}
//                                             className={`w-4 h-4 sm:w-6 sm:h-6 transition-all ${index < review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
//                                                 }`}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* 🔹 Review Comment */}
//                             <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">{review.comment}</p>

//                             {/* 🔹 Footer (Date & Helpful Button) */}
//                             <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm border-t pt-4 sm:pt-6">
//                                 <div className="flex items-center space-x-2 sm:space-x-3 text-gray-500">
//                                     <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
//                                     <span>{review.date}</span>
//                                 </div>
//                                 <button
//                                     onClick={() => handleHelpful(review.id)}
//                                     className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 group bg-gray-50 hover:bg-orange-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full"
//                                 >
//                                     <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
//                                     <span>{review.helpful} found this helpful</span>
//                                 </button>
//                             </div>

//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Users, MessageSquare, Award } from 'lucide-react';

export default function Review() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  const token = localStorage.getItem('token');

  // Calculate average rating and rating distribution
  const averageRating = reviews.length 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = reviews.reduce((acc, rev) => {
    acc[rev.rating] = (acc[rev.rating] || 0) + 1;
    return acc;
  }, {});

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/kitchen/user/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newReview,
          kitchenId: id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchReviews();
        setNewReview({ rating: 5, comment: '' });
      } else {
        console.error('Error:', data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Review submission failed:', err);
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/kitchen/getreview/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setReviews(data || []);
      } else {
        console.error('Failed to fetch reviews:', data.message);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Rating Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Rating */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-4xl font-bold text-blue-600">{averageRating}</div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>

          {/* Total Reviews */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-4xl font-bold text-green-600">{reviews.length}</div>
            <p className="text-gray-600 mt-2">Total Reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{
                        width: `${((ratingDistribution[rating] || 0) / reviews.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm w-8 text-right">
                    {ratingDistribution[rating] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Input */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-all ${
                      star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Share your experience..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-200 font-semibold"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Display */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">All Reviews</h3>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <div key={review._id} className="border border-gray-100 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {review?.userId?.fullname || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {review?.userId?.email || 'No email'}
                    </p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{formatDate(review.createdAt)}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}