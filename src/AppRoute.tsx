import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {lazy, Suspense} from 'react';
import Layout from 'components/Layout/Layout';
import {useAuth} from './hooks';
import {ProtectedRoute} from 'components';

const Login = lazy(() => import('pages/Login'));
const Pc = lazy(() => import('pages/Pc/Pc'));
const AddPc = lazy(() => import('pages/Pc/AddPc/AddPc'));
const Calendar = lazy(() => import('pages/Calendar/CalendarPage'));
const MapPage = lazy(() => import('pages/MapPage'));
const FightPage = lazy(() => import('pages/Fight/FightPage'));
const Players = lazy(() => import('pages/Player/Player'));
const Player = lazy(() => import('pages/Player/Players'));
const DetailPc = lazy(() => import('pages/Pc/DetailPc'));
const CreateSession = lazy(() => import('pages/Session/createSession'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const SessionPage = lazy(() => import('pages/Session/SessionPage'));
const SessionEditPage = lazy(() => import('pages/Session/SessionEditPage'));
const AddUser = lazy(() => import('pages/Player/AddUser'));

const AppRoute = () => {
  const auth = useAuth();
  auth?.user;
  return (
    <Router>
      <Suspense fallback={
        <Layout/>}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="map"
              element={
                <ProtectedRoute>
                  <MapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="fight"
              element={
                <ProtectedRoute
                  restricted={{to: ['gm', 'admin'], redirectPath: '/'}}
                >
                  <FightPage />
                </ProtectedRoute>
              }
            />
            <Route path="sessions">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <SessionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add"
                element={
                  <ProtectedRoute
                    restricted={{to: ['gm', 'admin'], redirectPath: '/'}}
                  >
                    <CreateSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute>
                    <SessionEditPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="players">
              <Route
                index
                element={
                  <ProtectedRoute
                    restricted={{to: ['gm', 'admin'], redirectPath: '/'}}
                  >
                    <Players />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':id'
                element={
                  <ProtectedRoute>
                    <Player />
                  </ProtectedRoute>}
              />
              <Route
                path="add"
                element={
                  <ProtectedRoute
                    restricted={{to: ['admin'], redirectPath: '/'}}
                  >
                    <AddUser />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="pc">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Pc />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add"
                element={
                  <ProtectedRoute>
                    <AddPc />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRoute>
                    <DetailPc />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoute;
