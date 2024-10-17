import React from 'react';
import { MapPin, Calendar, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Travel background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 py-32 sm:py-48 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            A travel planner for everyone
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Organize flights & hotels and map your trips in a free travel app designed for
            vacation planning & road trips, powered by AI and Google Maps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/plan"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 flex items-center justify-center"
            >
              <MapPin className="mr-2" />
              Start planning
            </Link>
            <button className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center">
              <Plane className="mr-2" />
              Get the app
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;