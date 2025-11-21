import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageServices() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Everest Base Camp Guide",
      price: "₹5,000/day",
      status: "Active",
      bookings: 12
    },
    {
      id: 2,
      name: "Annapurna Circuit Guide",
      price: "₹4,500/day",
      status: "Active",
      bookings: 8
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleAddService = () => {
    if (!newService.name || !newService.price) {
      alert('Please fill all required fields');
      return;
    }

    const service = {
      id: services.length + 1,
      name: newService.name,
      price: newService.price,
      status: 'Active',
      bookings: 0
    };

    setServices([...services, service]);
    setNewService({ name: '', price: '', description: '' });
    setShowForm(false);
    alert('Service added successfully!');
  };

  const handleToggleStatus = (id) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
        : service
    ));
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
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
            <h1 className="text-3xl font-bold">Manage Services</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Service'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Add Service Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Service</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="e.g., Everest Base Camp Guide"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  placeholder="e.g., ₹5,000/day"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Describe your service..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>

              <button
                onClick={handleAddService}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Add Service
              </button>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-xs font-bold ${
                    service.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {service.status}
                  </span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{service.price}</span>
              </div>

              <div className="mb-4 text-gray-600">
                <p>📅 <span className="font-semibold">{service.bookings} bookings</span></p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleStatus(service.id)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors font-semibold ${
                    service.status === 'Active'
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && !showForm && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-2xl text-gray-600 mb-4">No services yet</p>
            <p className="text-gray-500 mb-6">Add your services to start receiving bookings</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Add Your First Service
            </button>
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