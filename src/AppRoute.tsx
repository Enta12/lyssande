import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Layout from 'components/Layout/Layout';
import { useAuth } from './hooks';
import { ProtectedRoute } from 'components';

const Login = lazy(() => import('pages/Login'));
const Pc = lazy(() => import('pages/Pc/Pc'));
const AddPc = lazy(() => import('pages/Pc/AddPc/AddPc'));
const Calendar = lazy(() => import('pages/Calendar/CalendarPage'));
//const MapPage = lazy(() => import('pages/MapPage'));
const Players = lazy(() => import('pages/Player/Players'));
const Player = lazy(() => import('pages/Player/Player'));
const DetailPc = lazy(() => import('pages/Pc/DetailPc'));
const CreateSession = lazy(() => import('pages/Session/createSession'));
const NotFound = lazy(() => import('pages/404'));
const SessionPage = lazy(() => import('pages/Session/SessionPage'));
const SessionEditPage = lazy(() => import('pages/Session/SessionEditPage'));
const AddUser = lazy(() => import('pages/Player/AddUser'));
const Forbidden = lazy(() => import('pages/403'));
const Invitation = lazy(() => import('pages/Invitation'));

const AppRoute = () => {
	const auth = useAuth();
	auth?.user;
	return (
		<Router>
			<Suspense fallback={<Layout />}>
				<Routes>
					<Route path="/invitation" element={<Invitation />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Layout />}>
						<Route path="403" element={<Forbidden />} />
						<Route
							index
							element={
								<ProtectedRoute>
									<SessionPage />
								</ProtectedRoute>
							}
						/>
						{/* <Route
							path="map"
							element={
								<ProtectedRoute>
									<MapPage />
								</ProtectedRoute>
							}
						/> */}
						<Route
							path="calendar"
							element={
								<ProtectedRoute>
									<Calendar />
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
									<ProtectedRoute restrictedTo={['admin', 'gm']}>
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
									<ProtectedRoute restrictedTo={['gm', 'admin']}>
										<Players />
									</ProtectedRoute>
								}
							/>
							<Route
								path=":id"
								element={
									<ProtectedRoute>
										<Player />
									</ProtectedRoute>
								}
							/>
							<Route
								path="add"
								element={
									<ProtectedRoute restrictedTo={['admin', 'admin']}>
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
								path=":id"
								element={
									<ProtectedRoute>
										<DetailPc />
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
							<Route path="edit">
								<Route
									index
									element={
										<ProtectedRoute>
											<NotFound />
										</ProtectedRoute>
									}
								/>
								<Route
									path=":id"
									element={
										<ProtectedRoute>
											<AddPc />
										</ProtectedRoute>
									}
								/>
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default AppRoute;
