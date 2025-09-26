// Header.jsx
import { useState, useEffect, useRef } from "react";
import { Heart, Bell, Sparkles, Gift, Leaf, Star } from 'lucide-react';
import "./App.css"; // Import the CSS file for styling

const Header = () => {
  const [notification, setNotification] = useState("Welcome to Vijaya Pharmaceuticals");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const scrollingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 50) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const generateRandomNotification = () => {
    const notifications = [
      { icon: Sparkles, text: "New Product Arrivals!" },
      { icon: Leaf, text: "Health Tips of the Day" },
      { icon: Gift, text: "Special Discounts Today" },
      { icon: Bell, text: "Don't forget to check our promotions!" },
      { icon: Heart, text: "Stay healthy and vibrant!" },
      { icon: Star, text: "An apple a day keeps the doctor away!" },
      { icon: Gift, text: "Explore our latest wellness products." },
      { icon: Heart, text: "Your health is our top priority!" },
      { icon: Sparkles, text: "Check out our latest features!" },
      { icon: Star, text: "Embrace a colorful and healthy life!" },
      { icon: Heart, text: "Expert advice for your well-being!" },
      { icon: Sparkles, text: "Discover the secret to vitality!" },
    ];
    const randomIndex = Math.floor(Math.random() * notifications.length);
    return notifications[randomIndex];
  };

  const handleAnimationIteration = () => {
    setNotification(generateRandomNotification());
  };

  const currentNotification = typeof notification === 'string' 
    ? { icon: Bell, text: notification }
    : notification;

  const IconComponent = currentNotification.icon;

  return (
<header
        className={`bg-gradient-to-r from-teal-500 to-indigo-500 text-white transition-all duration-300 ${
          showStickyHeader ? "sticky-nav py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center logo-container">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${
                showStickyHeader ? "text-slate-900" : "text-white"
              } company-name`}>
                VIJAYA PHARMACEUTICALS
              </h1>
              <p className={`text-sm transition-colors duration-300 ${
                showStickyHeader ? "text-slate-600" : "text-teal-100"
              } tagline`}>
                Your Health, Our Priority
              </p>
            </div>
          </div>

          {/* Notification Area */}
          <div className="hidden md:flex items-center">
            <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-3 border border-white/30 shadow-lg">
              <div
                className="notification-container"
                onAnimationIteration={handleAnimationIteration}
              >
                <div className="scrolling-notification text-sm font-medium" ref={scrollingRef}>
                  <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{currentNotification.text}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Notification */}
          <div className="md:hidden">
            <div className="bg-white/20 backdrop-blur rounded-full p-2 border border-white/30">
              <Bell className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Notification Bar - Only visible on mobile */}
        <div className="md:hidden bg-white/10 backdrop-blur border-t border-white/20 py-2">
          <div className="container mx-auto px-4">
            <div
              className="notification-container w-full"
              onAnimationIteration={handleAnimationIteration}
            >
              <div className="scrolling-notification text-xs font-medium" ref={scrollingRef}>
                <IconComponent className="w-3 h-3 mr-2 flex-shrink-0" />
                <span>{currentNotification.text}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
