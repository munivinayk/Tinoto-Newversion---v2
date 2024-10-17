import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import tripsData from '../data/trips.json';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recently viewed and upcoming</h1>
          <button
            onClick={() => navigate('/plan')}
            className="md:hidden w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 flex items-center justify-center mb-6"
          >
            <Plus size={20} className="mr-2" />
            Plan new trip
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/plan')}
            className="hidden md:flex bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 items-center"
          >
            <Plus size={20} className="mr-2" />
            Plan new trip
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tripsData.trips.map((trip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                {trip.upcoming && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    In {trip.upcoming}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{trip.title}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`} alt={user.email} className="w-6 h-6 rounded-full mr-2" />
                  <span>{trip.date}</span>
                  <span className="mx-2">•</span>
                  <span>{trip.places} places</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;