import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit, Share2, MapPin, BookOpen, Plus } from 'lucide-react';
import tripsData from '../data/trips.json';
import { Link, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trips');
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - User Profile */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                    alt={user.email}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.displayName || 'Muni Vinay'}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                <div className="flex justify-between w-full text-center mb-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">FOLLOWERS</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">FOLLOWING</p>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 mb-2 flex items-center justify-center">
                  <Edit size={20} className="mr-2" />
                  Edit
                </button>
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center">
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Trips and Guides */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <div className="flex border-b border-gray-300 dark:border-gray-700">
                <button
                  className={`flex items-center px-4 py-2 ${
                    activeTab === 'trips'
                      ? 'border-b-2 border-orange-500 text-orange-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('trips')}
                >
                  <MapPin size={20} className="mr-2" />
                  Trip plans
                </button>
                <button
                  className={`flex items-center px-4 py-2 ${
                    activeTab === 'guides'
                      ? 'border-b-2 border-orange-500 text-orange-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('guides')}
                >
                  <BookOpen size={20} className="mr-2" />
                  Guides
                </button>
              </div>
            </div>

            {activeTab === 'trips' && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">My Trips</h2>
                  <Link
                    to="/plan"
                    className="w-full md:w-auto bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 flex items-center justify-center md:justify-start"
                  >
                    <Plus size={20} className="mr-2" />
                    Plan a new trip
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tripsData.trips.map((trip, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-32">
                        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                        {trip.upcoming && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            In {trip.upcoming}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1">{trip.title}</h3>
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <span>{trip.date}</span>
                          <span className="mx-2">•</span>
                          <span>{trip.places} places</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'guides' && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't written any guides yet.</p>
                <Link
                  to="/write-guide"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 inline-flex items-center"
                >
                  Create a guide
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;