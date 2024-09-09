import React from "react";

const Header = ({ title, navText }) => {
  return (
    <header className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-left">
      <h1 className="text-2xl font-bold pl-24">{title}</h1>
      <nav className="text-sm pl-24 my-1">{navText}</nav>
    </header>
  );
};

export default Header;
