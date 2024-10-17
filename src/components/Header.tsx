import React, { useState, useEffect, useRef } from 'react';
import { Search, Moon, Sun, WifiOff, Bell, User, Hotel, Settings, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import citiesData from '../data/cities.json';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface City {
  name: string;
  region: string;
  country: string;
  type: string;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, signOut, isOffline } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = citiesData.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setShowNotificationsDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCitySelect = (city: City) => {
    console.log('Selected destination:', city);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z" fill="url(#paint0_linear)" />
            <path d="M16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7Z" fill="#1E293B" />
            <path d="M16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10Z" fill="url(#paint1_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFFF" />
                <stop offset="1" stopColor="#FF00FF" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFFF" />
                <stop offset="1" stopColor="#FF00FF" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xl font-bold text-gray-800 dark:text-white">Tinoto</span>
        </Link>
        
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Explore by destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {showDropdown && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
              {filteredCities.map((city, index) => (
                <li
                  key={`${city.name}-${city.country}-${city.type}-${index}`}
                  onClick={() => handleCitySelect(city)}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {city.name}, {city.country} ({city.type})
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isOffline && (
            <div className="flex items-center text-yellow-500">
              <WifiOff size={18} className="mr-1" />
              <span className="text-sm">Offline Mode</span>
            </div>
          )}
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <>
              <div className="relative" ref={notificationsDropdownRef}>
                <button
                  onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                  className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell size={20} />
                </button>
                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Notifications</h3>
                    <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">You don't have any notifications.</p>
                  </div>
                )}
              </div>
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white"
                >
                  {user.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User className="inline-block mr-2" size={16} />
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User className="inline-block mr-2" size={16} />
                      Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Hotel className="inline-block mr-2" size={16} />
                      Bookings
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="inline-block mr-2" size={16} />
                      Settings
                    </Link>
                    <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <History className="inline-block mr-2" size={16} />
                      History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="inline-block mr-2" size={16} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setShowLoginModal(true)} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Log in
              </button>
              <button onClick={() => setShowSignupModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginForm
          onClose={() => setShowLoginModal(false)}
          onSignupClick={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}
      {showSignupModal && (
        <SignupForm
          onClose={() => setShowSignupModal(false)}
          onLoginClick={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </header>
  );
};

export default Header;