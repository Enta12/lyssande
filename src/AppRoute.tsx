import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Layout from './components/layout/layout';
import Login from './pages/login/login';
import Pj from './pages/pj/pj';
import AddPj from './pages/pj/addPj/addPj';
import Calendar from './pages/calendar/CalendarPage';
import MapPage from './pages/MapPage';
import FightPage from './pages/fight/FightPage';
import Player from './pages/player/player';
import DetailPj from './pages/pj/detailPj';
import Players from './pages/player/players';
import CreateSession from './pages/session/createSession';
import NotFound from './pages/notFound/NotFound';
import SessionPage from './pages/session/SessionPage';
import SessionEditPage from './pages/session/SessionEditPage';
import AddUser from './pages/player/addUser';
import {useAuth} from './hook';


const AppRoute = () => {
  const auth = useAuth();
  auth?.user;
  return (
    <Router>
      {
        auth?.user.isLogged ?
        <Routes>
          <Route path='/pj' element={<Layout><Pj /></Layout>} />
          <Route path='/pj/:id' element={<Layout><DetailPj /></Layout>} />
          <Route path='/editCharacter' element={<Layout><AddPj /></Layout>}/>
          <Route
            path='/editCharacter/:id'
            element={<Layout><AddPj /></Layout>}
          />
          <Route path='/calendar' element={<Layout><Calendar /></Layout>} />
          <Route path='/map' element={<Layout><MapPage /></Layout>} />
          <Route path='/sessions' element={<Layout><SessionPage/></Layout>}/>
          <Route
            path='/sessions/:id'
            element={<Layout><SessionEditPage/></Layout>}
          />
          {
            (
              auth?.user.info?.role === 'gm' ||
              auth?.user.info?.role === 'admin') &&
              <>
                <Route
                  path='/player'
                  element={<Layout><Players /></Layout>}
                />
                <Route path='/player/:id' element={
                  <Layout><Player /></Layout>}
                />
                <Route path='/fight' element={
                  <Layout><FightPage /></Layout>} />
                <Route
                  path='/newSession'
                  element={
                    <Layout><CreateSession /></Layout>
                  }
                />
              </>
          }
          {
            auth?.user.info?.role === 'admin' &&
            <Route
              path='/addUser'
              element={
                <Layout><AddUser /></Layout>
              }
            />
          }
          <Route
            path='/' element={
              <Layout ><Player userId={auth?.user.info?.id} /></Layout>
            } />
          <Route path='*' element={<Layout><NotFound /></Layout>} />
        </Routes>:
        <Login />
      }
    </Router>
  );
};

export default AppRoute;
