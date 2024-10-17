import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import citiesData from '../data/cities.json';

const WriteGuidePage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    setError('');

    if (value.length > 0) {
      const filtered = citiesData.cities
        .filter(city => 
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.country.toLowerCase().includes(value.toLowerCase())
        )
        .map(city => `${city.name}, ${city.country}`);
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations([]);
    }
  };

  const handleStartWriting = () => {
    if (!destination.trim()) {
      setError('Choose a destination you want to write about');
      return;
    }
    // Log form data to console
    console.log('Writing guide for:', { destination });
    // Implement the logic to start writing a guide
    // For now, we'll just log the data
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Write a travel guide</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Help fellow travelers by writing up your tips or a past itinerary.
        </p>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              For where?
            </label>
            <div className="relative">
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="e.g. Paris, Hawaii, Japan"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              {filteredDestinations.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredDestinations.map((dest, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setDestination(dest);
                        setFilteredDestinations([]);
                        setError('');
                      }}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      {dest}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="text-center">
            <button
              onClick={handleStartWriting}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 mb-4"
            >
              Start writing
            </button>
            <p className="text-gray-600 dark:text-gray-400">
              <Link to="/plan" className="text-orange-500 hover:underline">
                Or start planning a trip
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteGuidePage;