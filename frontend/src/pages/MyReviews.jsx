import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyReviews() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      trekName: "Everest Base Camp Trek",
      rating: 5,
      date: "2024-10-15",
      comment: "Amazing experience! The guide was very knowledgeable and the views were breathtaking.",
      guide: "Sherpa Tenzing"
    },
    {
      id: 2,
      trekName: "Langtang Valley Trek",
      rating: 4,
      date: "2024-09-20",
      comment: "Great trek with beautiful landscapes. Could have been better if the weather was clearer.",
      guide: "Kumar Singh"
    }
  ]);
  const [newReview, setNewReview] = useState({
    trekName: '',
    rating: 5,
    comment: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleSubmitReview = () => {
    if (!newReview.trekName || !newReview.comment) {
      alert('Please fill all fields');
      return;
    }
    
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      guide: 'Guide Name'
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ trekName: '', rating: 5, comment: '' });
    setShowForm(false);
    alert('Review submitted successfully!');
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors">
              ← Back
            </button>
            <h1 className="text-3xl font-bold">My Reviews</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Write Review'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* New Review Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Write a New Review</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trek Name</label>
                <input
                  type="text"
                  value={newReview.trekName}
                  onChange={(e) => setNewReview({...newReview, trekName: e.target.value})}
                  placeholder="Enter trek name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`text-4xl transition-colors ${
                        star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience..."
                  className="textarea textarea-bordered w-full h-32"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-2xl text-gray-600 mb-4">No reviews yet</p>
              <p className="text-gray-500 mb-6">Share your trekking experiences with the community</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Write Your First Review
              </button>
            </div>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{review.trekName}</h3>
                    <p className="text-sm text-gray-500">{review.guide} • {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p>&copy; 2024 Gantabya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}