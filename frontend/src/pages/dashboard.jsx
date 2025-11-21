import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (loggedIn !== 'true' || !userData) {
      navigate('/signin');
    } else {
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100"><span className="text-xl text-gray-600">Loading...</span></div>;
  }

  const isTrekker = user?.role === 'trekker';
  const isServiceProvider = user?.role === 'service_provider';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/Images/logo.png" alt="Logo" className="h-10" />
            <h1 className="text-3xl font-bold">Gantabya</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.fullName}! 
          </h2>
          <p className="text-gray-600 text-lg">
            Role: <span className="font-semibold text-blue-600 capitalize">{user?.role.replace('_', ' ')}</span>
          </p>
          <p className="text-gray-500 mt-2">Email: {user?.email}</p>
        </div>

        {/* Trekker Dashboard */}
        {isTrekker && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Browse Treks Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Browse Treks</h3>
                <span className="text-3xl"></span>
              </div>
              <p className="text-gray-600">Explore available trekking adventures</p>
              <button 
                onClick={() => navigate('/browse-treks')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Explore Now
              </button>
            </div>

            {/* My Bookings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">My Bookings</h3>
                <span className="bg-green-100 text-green-600 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">0</span>
              </div>
              <p className="text-gray-600">Check your reservation history</p>
              <button 
                onClick={() => navigate('/my-bookings')}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                View Bookings
              </button>
            </div>

            {/* Favorite Guides Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Favorite Guides</h3>
                <span className="bg-yellow-100 text-yellow-600 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">0</span>
              </div>
              <p className="text-gray-600">Your saved favorite providers</p>
              <button 
                onClick={() => navigate('/favorite-guides')}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View Guides
              </button>
            </div>

            {/* Profile Settings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Profile Settings</h3>
                <span className="text-3xl">⚙️</span>
              </div>
              <p className="text-gray-600">Update your personal information</p>
              <button 
                onClick={() => navigate('/profile-settings')}
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* My Reviews Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">My Reviews</h3>
                <span className="text-3xl">⭐</span>
              </div>
              <p className="text-gray-600">Share your trekking experiences</p>
              <button 
                onClick={() => navigate('/my-reviews')}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                View Reviews
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Support</h3>
                <span className="text-3xl">💬</span>
              </div>
              <p className="text-gray-600">Get help from our support team</p>
              <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        )}

        {/* Service Provider Dashboard */}
        {isServiceProvider && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Manage Services Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Manage Services</h3>
                <span className="bg-blue-100 text-blue-600 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">0</span>
              </div>
              <p className="text-gray-600">Update your service offerings</p>
              <button 
                onClick={() => navigate('/manage-services')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Manage
              </button>
            </div>

            {/* Bookings Received Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Bookings Received</h3>
                <span className="bg-green-100 text-green-600 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center">0</span>
              </div>
              <p className="text-gray-600">Review incoming bookings</p>
              <button 
                onClick={() => navigate('/bookings-received')}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                View Bookings
              </button>
            </div>

            {/* Earnings Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Earnings</h3>
                <span className="text-3xl">$$</span>
              </div>
              <p className="text-gray-600">Track your revenue</p>
              <button 
                onClick={() => navigate('/earnings')}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                View Earnings
              </button>
            </div>

            {/* Business Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Business Profile</h3>
                <span className="text-3xl"></span>
              </div>
              <p className="text-gray-600">Update business information</p>
              <button 
                onClick={() => navigate('/business-profile')}
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Customer Reviews Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Customer Reviews</h3>
                <span className="text-3xl">⭐</span>
              </div>
              <p className="text-gray-600">See what customers say</p>
              <button 
                onClick={() => navigate('/my-reviews')}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                View Reviews
              </button>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
                <span className="text-3xl">📊</span>
              </div>
              <p className="text-gray-600">View performance metrics</p>
              <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600 text-sm">Account Status</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">Active ✓</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600 text-sm">Member Since</p>
              <p className="text-xl font-bold text-green-600 mt-2">Today</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="text-gray-600 text-sm">Account Type</p>
              <p className="text-xl font-bold text-yellow-600 mt-2 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-600 text-sm">Verification</p>
              <p className="text-xl font-bold text-purple-600 mt-2">Pending</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p>&copy; 2024 Prithak. All rights reserved. | Your partner in trekking adventures</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
