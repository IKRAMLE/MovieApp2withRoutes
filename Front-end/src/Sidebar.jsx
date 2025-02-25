import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  TrendingUp,
  User,
  Heart,
  Calendar,
  ChevronDown,
  Plus,
  LogOut
} from 'lucide-react';
import Ikram from "/Profile.png";
import Maria from "/1st.png";
import Hafsa from "/2nd.png";
import Salma from "/3rd.png";
import Xa from "/4th.png";

const MenuItem = ({ icon: Icon, text, active, onClick, path }) => (
  <div
    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer group transition-all duration-200
      ${active ? "bg-gray-700" : "hover:bg-gray-700"}`}
    onClick={() => onClick(path)}
  >
    <Icon
      size={20}
      className={`transition-colors duration-200 ${
        active ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"
      }`}
    />
    <span
      className={`transition-colors duration-200 ${
        active ? "text-blue-400" : "group-hover:text-blue-400"
      }`}
    >
      {text}
    </span>
  </div>
);

const FollowingItem = ({ name, image }) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
    <span className="text-sm">{name}</span>
  </div>
);

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState("/");

  // Update active menu item based on current route
  useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location]);

  const menuItems = [
    { icon: Compass, text: "Browser", path: "/" },
    { icon: TrendingUp, text: "Trending", path: "/trending" },
    { icon: User, text: "Following", path: "/following" },
    { icon: Plus, text: "Movie Add", path: "/movie-add" },
    { icon: Heart, text: "Favorite", path: "/favorite" },
  ];

  const followingUsers = [
    { name: "IkramLE", image: Ikram },
    { name: "MariaLh", image: Maria },
    { name: "HafsaBen", image: Hafsa },
    { name: "SalmaSA", image: Salma },
    { name: "Xa.na26", image: Xa },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setActiveMenuItem(path);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div
      className={`
        transform transition-transform duration-300 ease-in-out z-40 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed left-0 top-[73px] h-[calc(100vh-73px)]
      `}
    >
      <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
        <nav className="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div>
            <h3 className="text-lg font-semibold mb-4">News Feed</h3>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  path={item.path}
                  active={activeMenuItem === item.path}
                  onClick={handleMenuClick}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Following</h3>
            <div className="space-y-2">
              {followingUsers.map((user) => (
                <FollowingItem
                  key={user.name}
                  name={user.name}
                  image={user.image}
                />
              ))}
              <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-blue-400 w-full">
                <ChevronDown size={16} />
                <span className="text-sm">Load more</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-4 text-red-400 hover:text-red-600 hover:bg-gray-700 p-2 rounded-lg w-full"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
          <div className="text-sm">&copy; 2025 CineVibe</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;