import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, X, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import citiesData from '../data/cities.json';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';

interface City {
  name: string;
  region: string;
  country: string;
  type: string;
}

const PlanningPage: React.FC = () => {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState('');
  const { isLoggedIn } = useAuth();
  const [privacy, setPrivacy] = useState('friends');
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const filtered = citiesData.cities.filter(city =>
        city.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        city.country.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [inputValue]);

  const handleAddDestination = (city: City) => {
    setDestinations([...destinations, `${city.name}, ${city.country}`]);
    setInputValue('');
    setFilteredCities([]);
    setError('');
  };

  const handleRemoveDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate && new Date(e.target.value) > new Date(endDate)) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;
    if (new Date(selectedEndDate) >= new Date(startDate)) {
      setEndDate(selectedEndDate);
    }
  };

  const handleStartPlanning = () => {
    if (destinations.length === 0) {
      setError('Choose a destination to start planning');
      return;
    }
    
    // Log form data to console
    console.log('Planning trip:', {
      destinations,
      startDate,
      endDate,
      privacy
    });
    
    // Implement your planning logic here
  };

  const handleInviteFriends = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Implement invite friends logic
      console.log('Invite friends');
    }
  };

  const togglePrivacyDropdown = () => {
    setShowPrivacyDropdown(!showPrivacyDropdown);
  };

  const handlePrivacyChange = (newPrivacy: string) => {
    setPrivacy(newPrivacy);
    setShowPrivacyDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Plan a new trip</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Where to?
            </label>
            <div className="relative">
              <input
                type="text"
                id="destination"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Paris, Hawaii, Japan"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {filteredCities.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredCities.map((city, index) => (
                    <li
                      key={`${city.name}-${city.country}-${city.type}-${index}`}
                      onClick={() => handleAddDestination(city)}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    >
                      {city.name}, {city.country} ({city.type})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          {destinations.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Destinations:</h3>
              <div className="flex flex-wrap gap-2">
                {destinations.map((dest, index) => (
                  <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-sm flex items-center text-gray-800 dark:text-gray-200">
                    {dest}
                    <button onClick={() => handleRemoveDestination(index)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dates (optional)</h3>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="start-date" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start date</label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end-date" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End date</label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={startDate}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <button onClick={handleInviteFriends} className="text-orange-500 hover:underline flex items-center">
              <Users size={18} className="mr-2" />
              Invite tripmates
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="relative">
              <button
                onClick={togglePrivacyDropdown}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md flex items-center"
              >
                {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
                <ChevronDown size={18} className="ml-2" />
              </button>
              {showPrivacyDropdown && (
                <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => handlePrivacyChange('friends')}
                  >
                    Friends
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => handlePrivacyChange('private')}
                  >
                    Private
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                    onClick={() => handlePrivacyChange('public')}
                  >
                    Public
                  </li>
                </ul>
              )}
            </div>
            <button
              onClick={handleStartPlanning}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
            >
              Start planning
            </button>
          </div>
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
            or <Link to="/write-guide" className="text-orange-500 hover:underline">write a new guide</Link>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginForm
          onClose={() => setShowLoginModal(false)}
          onSignupClick={() => {
            setShowLoginModal(false);
            // Implement logic to show signup form
          }}
        />
      )}
    </div>
  );
};

export default PlanningPage;