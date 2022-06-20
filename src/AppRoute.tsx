import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Layout from './components/layout';
import Login from './pages/login/login';
import Pj from './pages/pj/pj';
import AddPj from './pages/pj/addPj/addPj';
import Calendar from './pages/calendar/CalendarPage';
import MapPage from './pages/MapPage';
import FightPage from './pages/fight/FightPage';
import Player from './pages/player/player';
import DetailPj from './pages/pj/detailPj';
import Players from './pages/player/players';
import CreateSession from './pages/createSession';


const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path='/pj' element={<Layout><Pj /></Layout>} />
        <Route path='/pj/:id' element={<Layout><DetailPj /></Layout>} />
        <Route path='/player' element={<Layout><Players /></Layout>} />
        <Route path='/player/:id' element={<Layout><Player /></Layout>} />
        <Route path='/newSession' element={<Layout><CreateSession /></Layout>}/>
        <Route path='/fight' element={<Layout><FightPage /></Layout>} />
        <Route path='/newPj' element={<Layout><AddPj /></Layout>} />
        <Route path='/calendar' element={<Layout><Calendar /></Layout>} />
        <Route path='/map' element={<Layout><MapPage /></Layout>} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
