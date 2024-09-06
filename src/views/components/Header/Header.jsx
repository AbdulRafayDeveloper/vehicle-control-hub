import React from "react";

const Header = ({ title, navText }) => {
  return (
    <header className="p-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-left">
      <h1 className="text-2xl font-bold">{title}</h1>
      <nav className="text-sm">{navText}</nav>
    </header>
  );
};

export default Header;
