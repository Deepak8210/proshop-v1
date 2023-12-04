import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex justify-center my-4">
      <span className="text-gray-400">ProShop &copy; {currentYear}</span>
    </div>
  );
};

export default Footer;
