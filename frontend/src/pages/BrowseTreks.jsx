import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrowseTreks() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [treks, setTreks] = useState([
    {
      id: 1,
      name: "Everest Base Camp Trek",
      difficulty: "Hard",
      duration: "14 days",
      price: "₹45,000",
      image: "🏔️",
      guide: "Sherpa Tenzing",
      rating: 4.8,
      reviews: 245
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      difficulty: "Medium",
      duration: "12 days",
      price: "₹35,000",
      image: "⛰️",
      guide: "Ram Sharma",
      rating: 4.6,
      reviews: 189
    },
    {
      id: 3,
      name: "Manaslu Circuit Trek",
      difficulty: "Hard",
      duration: "16 days",
      price: "₹50,000",
      image: "🗻",
      guide: "Laxmi Devi",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Langtang Valley Trek",
      difficulty: "Easy",
      duration: "7 days",
      price: "₹18,000",
      image: "🌲",
      guide: "Kumar Singh",
      rating: 4.5,
      reviews: 312
    },
    {
      id: 5,
      name: "Dhaulagiri Trek",
      difficulty: "Hard",
      duration: "18 days",
      price: "₹55,000",
      image: "❄️",
      guide: "Pemba Sherpa",
      rating: 4.9,
      reviews: 98
    },
    {
      id: 6,
      name: "Makalu Base Camp Trek",
      difficulty: "Hard",
      duration: "15 days",
      price: "₹48,000",
      image: "🏔️",
      guide: "Dorje Tamang",
      rating: 4.7,
      reviews: 134
    }
  ]);
  const [filteredTreks, setFilteredTreks] = useState(treks);
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleFilter = (difficulty) => {
    setFilterDifficulty(difficulty);
    if (difficulty === 'All') {
      setFilteredTreks(treks);
    } else {
      setFilteredTreks(treks.filter(trek => trek.difficulty === difficulty));
    }
  };

  const handleBookTrek = (trek) => {
    alert(`Trek "${trek.name}" added to your bookings!`);
    // Add to bookings logic here
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
            <h1 className="text-3xl font-bold">Browse Treks</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Filter by Difficulty</h3>
          <div className="flex gap-3 flex-wrap">
            {['All', 'Easy', 'Medium', 'Hard'].map(level => (
              <button
                key={level}
                onClick={() => handleFilter(level)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  filterDifficulty === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Trek Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTreks.map(trek => (
            <div key={trek.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 text-center text-5xl">
                {trek.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{trek.name}</h3>
                
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  <p><span className="font-semibold">Duration:</span> {trek.duration}</p>
                  <p><span className="font-semibold">Difficulty:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                      trek.difficulty === 'Easy' ? 'bg-green-500' :
                      trek.difficulty === 'Medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {trek.difficulty}
                    </span>
                  </p>
                  <p><span className="font-semibold">Guide:</span> {trek.guide}</p>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-semibold">{trek.rating}</span>
                  <span className="text-gray-500 text-sm">({trek.reviews} reviews)</span>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{trek.price}</span>
                  <button
                    onClick={() => handleBookTrek(trek)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
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