import Nav from 'components/Nav/Nav';
import logo from 'assets/images/logo.png';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="h-28 px-16 bg-swamp flex items-center justify-between">
      <button onClick={() => navigate('/')}>
        <img className="h-24" src={logo} alt="logo" />
      </button>
      <Nav />
    </header>
  );
};

export default Header;
