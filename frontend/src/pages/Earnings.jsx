import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Earnings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [earnings] = useState({
    totalEarnings: "₹1,45,000",
    monthlyEarnings: "₹35,000",
    pendingPayment: "₹8,500",
    transactions: [
      { id: 1, date: "2024-11-15", service: "Everest Base Camp Guide", amount: "₹20,000", status: "Completed" },
      { id: 2, date: "2024-11-10", service: "Annapurna Circuit Guide", amount: "₹18,000", status: "Completed" },
      { id: 3, date: "2024-11-05", service: "Langtang Valley Guide", amount: "₹15,000", status: "Pending" }
    ]
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/dashboard')} className="hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors">
              ← Back
            </button>
            <h1 className="text-3xl font-bold">Earnings & Revenue</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
            <p className="text-4xl font-bold text-blue-600">{earnings.totalEarnings}</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">This Month</p>
            <p className="text-4xl font-bold text-green-600">{earnings.monthlyEarnings}</p>
            <p className="text-gray-500 text-sm mt-2">From 8 bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-gray-600 text-sm mb-2">Pending Payment</p>
            <p className="text-4xl font-bold text-yellow-600">{earnings.pendingPayment}</p>
            <button className="text-blue-600 text-sm mt-2 hover:underline font-semibold">
              Request Payout
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4">{transaction.service}</td>
                    <td className="py-4 px-4 font-bold text-green-600">{transaction.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                        transaction.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-6 border-t">
            <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
              Request Payout
            </button>
          </div>
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