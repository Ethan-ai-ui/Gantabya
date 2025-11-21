import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FavoriteGuides() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [guides, setGuides] = useState([
    {
      id: 1,
      name: "Sherpa Tenzing",
      experience: "15 years",
      specialty: "Everest Base Camp",
      rating: 4.9,
      reviews: 245,
      price: "₹5,000/day",
      badge: "Expert Guide"
    },
    {
      id: 2,
      name: "Ram Sharma",
      experience: "12 years",
      specialty: "Annapurna Circuit",
      rating: 4.8,
      reviews: 189,
      price: "₹4,500/day",
      badge: "Certified"
    },
    {
      id: 3,
      name: "Laxmi Devi",
      experience: "10 years",
      specialty: "Manaslu Circuit",
      rating: 4.7,
      reviews: 156,
      price: "₹4,000/day",
      badge: "Professional"
    }
  ]);
  const [favorites, setFavorites] = useState([1, 2]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const toggleFavorite = (guideId) => {
    setFavorites(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  const handleHireGuide = (guide) => {
    alert(`Hiring request sent to ${guide.name}!`);
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
            <h1 className="text-3xl font-bold">Favorite Guides</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">No favorite guides yet</p>
            <p className="text-gray-500">Add guides to your favorites to keep track of them</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.filter(guide => favorites.includes(guide.id)).map(guide => (
              <div key={guide.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 text-center">
                  <div className="text-5xl mb-3">👨‍🏫</div>
                  <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-bold">{guide.badge}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{guide.name}</h3>
                  
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Experience:</span> {guide.experience}</p>
                    <p><span className="font-semibold">Specialty:</span> {guide.specialty}</p>
                    <p><span className="font-semibold">Rate:</span> {guide.price}</p>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-gray-500 text-sm">({guide.reviews} reviews)</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleHireGuide(guide)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Hire
                    </button>
                    <button
                      onClick={() => toggleFavorite(guide.id)}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors font-semibold ${
                        favorites.includes(guide.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {favorites.includes(guide.id) ? '❤️ Favorited' : '🤍 Add'}
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