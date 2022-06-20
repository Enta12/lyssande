import React from 'react';
import Header from './header';
import Notif from './notif';
import Footer from './footer';

const Layout = (props : {children: JSX.Element, notifMessage?: string}) => {
  const {children, notifMessage} = props;
  return (
    <div className="
        min-h-screen
        h-full
        flex
        justify-between
        flex-col
        bg-amber-100
    ">
      <div>
        <Header />
        {notifMessage && <Notif>{notifMessage}</Notif>}
      </div>

      <section className="
        items-center
        h-full
        flex
        justify-start
        py-6
        bg-amber-100
        flex-col
        mx-40"
      >
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
