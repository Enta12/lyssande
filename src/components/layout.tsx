import React from 'react';
import Header from './header';
import Footer from './footer';

type Props = {
  Page : JSX.Element;
}

const Layout = ({Page} : Props) => {
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
        {Page}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
