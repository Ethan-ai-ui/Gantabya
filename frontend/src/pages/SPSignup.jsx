import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function SPSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    phone: "",
    citizenshipNumber: "",
    contactNumber: "",
    servicesOffered: []
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServicesChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      servicesOffered: checked
        ? [...prev.servicesOffered, value]
        : prev.servicesOffered.filter(service => service !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      const response = await api.signupServiceProvider(
        formData.email,
        formData.password,
        formData.fullName,
        {
          companyName: formData.companyName,
          phone: formData.phone,
          citizenshipNumber: formData.citizenshipNumber,
          contactNumber: formData.contactNumber,
          servicesOffered: formData.servicesOffered
        }
      );
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard');
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <Link to={'/'}>
        <img
          src="/Images/logo.png"
          alt="Gantabya Logo"
          className="fixed top-4 left-4 w-40 h-30 object-contain z-50"
        />
      </Link>

      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-[1000px] h-[90%] max-h-[800px] flex overflow-hidden">
        <div className="md:flex flex-1 bg-[url('/Images/trek.jpg')] bg-cover bg-center rounded-l-xl">
          <div className="w-full h-full flex items-end p-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">Grow Your Trekking Business</h2>
              <p className="max-w-md">
                Connect with thousands of trekkers and expand your service reach in Nepal's Himalayas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col h-full justify-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Service Provider Registration</h1>
              <p className="text-gray-600">Register your trekking service business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  className="input input-bordered w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  className="input input-bordered w-full"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number*</label>
                <input
                  required
                  type="tel"
                  name="contactNumber"
                  className="input input-bordered w-full"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship Number*</label>
                <input
                  required
                  type="text"
                  name="citizenshipNumber"
                  className="input input-bordered w-full"
                  value={formData.citizenshipNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered*</label>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="Trekking Guide"
                    checked={formData.servicesOffered.includes("Trekking Guide")}
                    onChange={handleServicesChange}
                    className="checkbox mr-2"
                  />
                  Trekking Guide
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="Accommodation"
                    checked={formData.servicesOffered.includes("Accommodation")}
                    onChange={handleServicesChange}
                    className="checkbox mr-2"
                  />
                  Accommodation
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="input input-bordered w-full pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-around items-center mb-4">
              <button type="submit" className="btn btn-primary w-40 h-10 mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl text-white font-semibold">
                Sign up
              </button>
            </div>

            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
