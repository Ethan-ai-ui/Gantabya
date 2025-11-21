import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Trekkersignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          role: 'trekker',
        }),
      });

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
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

      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-[1000px] h-[90%] max-h-[700px] flex overflow-hidden">
        <div className="md:flex flex-1 bg-[url('/Images/trek.jpg')] bg-cover bg-center rounded-l-xl">
          <div className="w-full h-full flex items-end p-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2">"Begin Your Himalayan Adventure"</h2>
              <p className="max-w-md">
                Join our community of trekkers to explore Nepal's breathtaking trails and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-center relative overflow-y-auto">
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="Images/favicon.png" className="w-30 mt-15" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Trekker Account</h1>
          <p className="text-gray-600 text-center mb-8">Join Gantabya to start your adventure</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                className="input input-bordered w-full"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                required
                type="email"
                className="input input-bordered w-full"
                placeholder="trekker@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pr-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input input-bordered w-full pr-10"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary w-40 h-10 mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl text-white font-semibold">
                Sign Up
              </button>
            </div>

            <p className="text-center text-sm mt-6">
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
