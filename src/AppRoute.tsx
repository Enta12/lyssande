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
          <Route path='/pj' element={<Layout Page={<Pj />}/>} />
          <Route path='/pj/:id' element={<Layout Page={<DetailPj />} />} />
          <Route path='/editCharacter' element={
            <Layout Page={<AddPj />} />} />
          <Route path='/editCharacter/:id' element={
            <Layout Page={<AddPj />} />} />
          <Route path='/calendar' element={<Layout Page={<Calendar />} />} />
          <Route path='/map' element={<Layout Page={<MapPage />} />} />
          <Route path='/sessions' element={<Layout Page={<SessionPage/>}/>}/>
          <Route
            path='/sessions/:id'
            element={<Layout Page={<SessionEditPage/>}/>}
          />
          {
            (
              auth?.user.info?.role === 'gm' ||
              auth?.user.info?.role === 'admin') &&
              <>
                <Route path='/player' element={
                  <Layout Page={<Players />}/>
                } />
                <Route path='/player/:id' element={
                  <Layout Page={<Player />}/>
                } />
                <Route path='/fight' element={
                  <Layout Page={<FightPage />}/>
                } />
                <Route
                  path='/newSession'
                  element={
                    <Layout Page={<CreateSession />} />
                  }
                />
              </>
          }
          {
            auth?.user.info?.role === 'admin' &&
            <Route
              path='/addUser'
              element={
                <Layout Page={<AddUser />} />
              }
            />
          }
          <Route path='/' element={
            <Layout Page={
              <Player userId={auth?.user.info?.id} />
            }/>
          } />
          <Route path='*' element={<Layout Page={<NotFound />} />} />
        </Routes>:
        <Login />
      }
    </Router>
  );
};

export default AppRoute;
