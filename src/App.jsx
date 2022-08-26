import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoutes from './helpers/protected-route';
import LoadRoutes from './helpers/load-routes';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/_error.page'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const Messages = lazy(() => import('./pages/messages'));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div className="flex h-screen flex-col items-center justify-center">
              <img
                className=" aspect-square h-16 w-16 animate-pulse opacity-25"
                src="/images/logo-icon.png"
                alt="Logo"
              />
            </div>
          }
        >
          <LoadRoutes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.MESSAGES} element={<Messages />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<NotFound />} />
          </LoadRoutes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
