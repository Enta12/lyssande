import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';


const Layout = () => {
  return (
    <div className="
        min-h-screen
        h-full
        flex
        justify-between
        flex-col
    ">
      <div>
        <Header />
      </div>

      <section className="
        items-center
        h-full
        flex
        justify-start
        py-6
        flex-col
        mx-40"
      >
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
