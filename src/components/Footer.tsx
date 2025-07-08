import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-400 font-cinzel">
              © 2024 Disygo Digital Solutions. All rights reserved. | Website developed by{' '}
              <a
                href="https://linkedin.com/in/vamsi-krishna-orsu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-600 underline font-bold"
              >
                Vamsi Krishna Orsu
              </a>
            </p>
          </div>
          <div className="flex justify-end space-x-6 text-sm">
            <Link 
              to="/about" 
              className="text-gray-400 hover:text-gold-400 transition-colors duration-300 font-cinzel"
            >
              About Us
            </Link>
            <span className="text-gray-600">|</span>
            <button 
              className="text-gray-400 hover:text-gold-400 transition-colors duration-300 font-cinzel bg-transparent border-none cursor-pointer"
              onClick={() => alert('Terms & Conditions page coming soon!')}
            >
              Terms & Conditions
            </button>
            <span className="text-gray-600">|</span>
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-gold-400 transition-colors duration-300 font-cinzel"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 