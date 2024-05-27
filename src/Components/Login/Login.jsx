import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await axios.post(`https://web-s-backend.vercel.app${endpoint}`, formData);
      console.log(response.data);
      if (isLogin) {
        // Redirect to home page after successful login
        navigate('/home');
      } else {
        // Show popup on successful registration
        setPopupMessage('Registration Successful!');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      // Show popup on error
      setPopupMessage(error.response?.data?.error || error.message);
      setShowPopup(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={handleToggleForm} disabled={loading} className="ml-2 text-blue-600">
            {loading ? 'Loading...' : (isLogin ? 'Register' : 'Login')}
          </button>
        </p>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-center">{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
