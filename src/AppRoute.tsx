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
  React.createContext<{user?: User, setUser?:(user: User) => void}>({});

const AppRoute = () => {
  const token = localStorage.getItem('token');
  const tokenDecode = token ? jwtDecode(token) as any : null;
  // Change to Type Token
  const [user, setUser] = useState<User | undefined>(
    tokenDecode ?
    {userId: tokenDecode.user_id} : undefined,
  );
  if (token) {
    return (
      <AuthContext.Provider value={{user, setUser}} >
        <Router>
          <Routes>
            <Route path='/pj' element={<Layout><Pj /></Layout>} />
            <Route path='/pj/:id' element={<Layout><DetailPj /></Layout>} />
            <Route path='/player' element={<Layout><Players /></Layout>} />
            <Route path='/player/:id' element={<Layout><Player /></Layout>} />
            <Route
              path='/newSession'
              element={<Layout><CreateSession /></Layout>}
            />
            <Route path='/fight' element={<Layout><FightPage /></Layout>} />
            <Route path='/editCharacter' element={<Layout><AddPj /></Layout>} />
            <Route path='/editCharacter/:id' element={
              <Layout><AddPj /></Layout>} />
            <Route path='/calendar' element={<Layout><Calendar /></Layout>} />
            <Route path='/map' element={<Layout><MapPage /></Layout>} />
            <Route path='/' element={<Layout><Players /></Layout>} />
            <Route path='*' element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Router>
      </AuthContext.Provider>

    );
  } else {
    return <Login setUser={setUser}/>;
  }
};

export default AppRoute;
