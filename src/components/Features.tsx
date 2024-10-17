import React from 'react';
import { Map, Calendar, Plane, Hotel } from 'lucide-react';

const features = [
  {
    icon: <Map className="w-8 h-8 text-orange-500" />,
    title: 'Interactive Maps',
    description: 'Plan your route with our interactive maps powered by Google Maps.',
  },
  {
    icon: <Calendar className="w-8 h-8 text-orange-500" />,
    title: 'Itinerary Planning',
    description: 'Create detailed itineraries for your trips with ease.',
  },
  {
    icon: <Plane className="w-8 h-8 text-orange-500" />,
    title: 'Flight Booking',
    description: 'Find and book the best flights for your journey.',
  },
  {
    icon: <Hotel className="w-8 h-8 text-orange-500" />,
    title: 'Hotel Reservations',
    description: 'Discover and reserve accommodations that fit your needs and budget.',
  },
];

const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Tinoto?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;