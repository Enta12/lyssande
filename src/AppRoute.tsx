import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
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
import CreateSession from './pages/session/createSession';
import jwtDecode from 'jwt-decode';
import {Token} from './types';
import NotFound from './pages/notFound/NotFound';
import SessionPage from './pages/session/SessionPage';
import SessionEditPage from './pages/session/SessionEditPage';


export const AuthContext =
  React.createContext<{
    user?: Token,
    setUser:(user?: Token) => void
        }>({setUser: () => console.error('no setuser')});

const AppRoute = () => {
  const token = localStorage.getItem('lyssandeLocal');
  const tokenDecode = token ? jwtDecode(token) as Token : null;
  const [user, setUser] = useState<Token | undefined>(
    tokenDecode ?
    {...tokenDecode} : undefined,
  );
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Router>
        {
          token ?
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
                user?.role === 'gm' ||
                user?.role === 'admin') &&
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
            <Route path='/' element={
              <Layout Page={
                <Player userId={user?.userId} />
              }/>
            } />
            <Route path='*' element={<Layout Page={<NotFound />} />} />
          </Routes>:
          <Login />
        }
      </Router>
    </AuthContext.Provider>
  );
};

export default AppRoute;
