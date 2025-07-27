import React, { useState } from 'react';
import { Menu, Home, User, Settings, Trophy, MapPin, Camera, X } from 'lucide-react';

const FloatingMenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', description: 'Go to home screen', href: '/' },
    { id: 'profile', icon: User, label: 'Profile', description: 'View your profile', href: '/dashboard' },
    { id: 'map', icon: MapPin, label: 'Map', description: 'Explore the map', href: '/map' },
    { id: 'camera', icon: Camera, label: 'Camera', description: 'Take a photo', href: '/camera' },
    { id: 'achievements', icon: Trophy, label: 'Achievements', description: 'View your achievements', href: '/achievements' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'App settings', href: '/settings' },
  ];

  const handleMenuItemClick = (item) => {
    console.log(`Navigating to ${item.label}`);
    // Here you would implement navigation logic
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 ease-in-out"
          style={{ bottom: '0', right: '0', top: '0', left: '0', margin: '-1.5rem' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Items */}
      <div className={`absolute menu-button-position transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-4 min-w-72">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`transform transition-all duration-300 ease-out ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <a
                  href={item.href}
                  onClick={() => handleMenuItemClick(item)}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 active:bg-red-100 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-md">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:scale-95 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
        } border-2 border-red-400 hover:border-red-300`}
      >
        <div className="relative">
          <Menu 
            className={`w-6 h-6 text-white transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            } absolute`} 
          />
          <X 
            className={`w-6 h-6 text-white transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`} 
          />
        </div>
      </button>

      {/* Floating particles effect */}
      {isMenuOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-400 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingMenuButton;