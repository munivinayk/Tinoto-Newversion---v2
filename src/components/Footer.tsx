import React from 'react';
import { MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MapPin className="text-orange-500 mr-2" />
            <span className="text-xl font-bold">tinoto</span>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-orange-500">About</a></li>
              <li><a href="#" className="hover:text-orange-500">Features</a></li>
              <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
              <li><a href="#" className="hover:text-orange-500">Contact</a></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500"><Facebook /></a>
            <a href="#" className="hover:text-orange-500"><Twitter /></a>
            <a href="#" className="hover:text-orange-500"><Instagram /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2023 Tinoto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;