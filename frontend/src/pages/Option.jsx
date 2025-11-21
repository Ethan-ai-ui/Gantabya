import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Option() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to gantavya</h1>
        <p className="text-lg text-gray-600">Choose your role to continue</p>
      </div>
      
      <div className="w-full max-w-md space-y-6">
        {/* Trekker Button */}
        <button
        onClick={() => navigate('/trekkersignup')}
         className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer">
          I'm a Trekker
          <p className="text-sm font-normal mt-1">Looking for trekking adventures and services</p>
        </button>
        
        {/* Service Provider Button */}
        <button
         onClick={() => navigate('/spsignup')}
         className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xl rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">
          I'm a Service Provider
          <p className="text-sm font-normal mt-1">Hotels, Transport, Guides, or other services</p>
        </button>
      </div>
      
      <div className="mt-12 text-center text-gray-500">
        <p>Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">
    Sign in
  </Link></p>
      </div>
    </div>
  )
}