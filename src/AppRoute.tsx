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
import CreateSession from './pages/createSession';
import jwtDecode from 'jwt-decode';
import {User} from './types';
import NotFound from './pages/notFound/NotFound';


export const AuthContext =
  React.createContext<{
    user?: User,
    setUser:(user?: User) => void
        }>({setUser: () => console.error('no setuser')});

const AppRoute = () => {
  const token = localStorage.getItem('lysandeLocal');
  const tokenDecode = token ? jwtDecode(token) as User : null;
  const [user, setUser] = useState<User | undefined>(
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
                  user?.role === 'gm' ||
                  user?.role === 'admin' ?
                  <Players /> :
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
