import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      trekName: "Everest Base Camp Trek",
      date: "2024-12-15",
      status: "Confirmed",
      price: "₹45,000",
      guide: "Sherpa Tenzing",
      participants: 4,
      image: "🏔️"
    },
    {
      id: 2,
      trekName: "Annapurna Circuit Trek",
      date: "2025-01-10",
      status: "Pending",
      price: "₹35,000",
      guide: "Ram Sharma",
      participants: 2,
      image: "⛰️"
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
      alert('Booking cancelled successfully!');
    }
  };

  const handleModifyBooking = (booking) => {
    alert(`Modify booking for "${booking.trekName}" - Coming soon!`);
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
            <h1 className="text-3xl font-bold">My Bookings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">No bookings yet</p>
            <p className="text-gray-500 mb-6">Start your adventure by browsing available treks</p>
            <button
              onClick={() => navigate('/browse-treks')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Browse Treks
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 flex justify-between items-center">
                  <span className="text-4xl">{booking.image}</span>
                  <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                    booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{booking.trekName}</h3>

                  <div className="space-y-3 mb-6 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Trek Date:</span>
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Guide:</span>
                      <span>{booking.guide}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Participants:</span>
                      <span>{booking.participants} people</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-semibold text-lg">Total Price:</span>
                      <span className="text-2xl font-bold text-blue-600">{booking.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleModifyBooking(booking)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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