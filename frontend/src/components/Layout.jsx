import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full">
      <header>
        <Header />
      </header>
      <main className="min-h-[calc(100vh-10rem)]">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
