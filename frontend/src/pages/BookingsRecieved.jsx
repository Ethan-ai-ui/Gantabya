import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingsReceived() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      clientName: "John Doe",
      service: "Everest Base Camp Guide",
      date: "2024-12-15",
      status: "Pending",
      participants: 4,
      price: "₹20,000"
    },
    {
      id: 2,
      clientName: "Sarah Smith",
      service: "Annapurna Circuit Guide",
      date: "2025-01-10",
      status: "Confirmed",
      participants: 2,
      price: "₹9,000"
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    alert(`Booking updated to ${newStatus}!`);
  };

  const handleRejectBooking = (id) => {
    if (window.confirm('Are you sure you want to reject this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
      alert('Booking rejected');
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
            <h1 className="text-3xl font-bold">Bookings Received</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">No bookings yet</p>
            <p className="text-gray-500">Your bookings will appear here when clients book your services</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{booking.clientName}</h3>
                    <p className="text-gray-600">{booking.service}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                    booking.status === 'Confirmed' ? 'bg-green-500' :
                    booking.status === 'Pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-600">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-semibold">{booking.participants} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-semibold text-blue-600">{booking.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Commission</p>
                    <p className="font-semibold">5% (₹{Math.round(parseInt(booking.price) * 0.05)})</p>
                  </div>
                </div>

                {booking.status === 'Pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectBooking(booking.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    >
                      Reject
                    </button>
                  </div>
                )}
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