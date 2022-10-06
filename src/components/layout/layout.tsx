import React, {ReactNode} from 'react';
import Header from './../header';
import Footer from './../footer';

type Props = {
  children: ReactNode
}

const Layout = ({children} : Props) => {
  return (
    <div className="
        min-h-screen
        h-full
        flex
        justify-between
        flex-col
        bg-[url('components/layout/background.jpeg')]
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
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
