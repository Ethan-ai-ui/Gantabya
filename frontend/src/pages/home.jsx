import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="./Images/logo.png" className="w-80" alt="Logo" />
      <button 
        onClick={() => navigate('/option')}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
      >
        Get Started
      </button>
    </div>
  );
}